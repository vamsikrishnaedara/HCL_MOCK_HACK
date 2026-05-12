import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import { memberService, issueService } from '../services/api';

const MemberDashboard = () => {
  const [memberId, setMemberId] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await memberService.getMemberDetails(memberId);
      const issuesRes = await memberService.getMemberIssues(memberId);
      
      const memberUser = { 
        username: response.data.name, 
        role: 'MEMBER', 
        memberId: response.data.memberId 
      };
      localStorage.setItem('user', JSON.stringify(memberUser));
      
      setMemberData(response.data);
      setIssuedBooks(issuesRes.data);
      setIsLoggedIn(true);
      setError('');
      window.location.reload(); // Refresh to update Navbar
    } catch (err) {
      setError('Member not found. Please check your ID.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleReturn = async (issueId) => {
    try {
      await issueService.returnBook(issueId);
      // Refresh data
      const issuesRes = await memberService.getMemberIssues(memberId);
      setIssuedBooks(issuesRes.data);
    } catch (err) {
      setError('Failed to return book.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="mt-5 d-flex justify-content-center">
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Member Login</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Member ID</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="e.g., 1" 
                  required 
                  value={memberId} 
                  onChange={(e) => setMemberId(e.target.value)} 
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">Access My Account</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2>Welcome, {memberData.name}</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Profile Info</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {memberData.email}<br/>
                <strong>Member ID:</strong> {memberData.memberId}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>My Issued Books</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks && issuedBooks.length > 0 ? (
            issuedBooks.map(issue => (
              <tr key={issue.issueId}>
                <td>{issue.book.title}</td>
                <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
                <td>{issue.returnDate ? new Date(issue.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                <td>
                  {!issue.returnDate && (
                    <Button variant="outline-danger" size="sm" onClick={() => handleReturn(issue.issueId)}>Return</Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" className="text-center">You have no active book issues.</td></tr>
          )}
        </tbody>
      </Table>
      <Button variant="secondary" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default MemberDashboard;
