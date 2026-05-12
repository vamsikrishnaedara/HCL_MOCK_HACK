import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col, Alert, Badge } from 'react-bootstrap';
import { memberService, bookService, issueService } from '../services/api';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  
  const [newMember, setNewMember] = useState({ name: '', email: '' });
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchMembers();
    fetchAvailableBooks();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await memberService.getAllMembers();
      setMembers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  const fetchAvailableBooks = async () => {
    try {
      const response = await bookService.getAvailableBooks();
      setAvailableBooks(response.data);
    } catch (err) {
      console.error('Error fetching available books:', err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await memberService.registerMember(newMember);
      setNewMember({ name: '', email: '' });
      setShowRegModal(false);
      setSuccess('Member registered successfully!');
      fetchMembers();
    } catch (err) {
      setError('Failed to register member.');
    }
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    try {
      await issueService.issueBook({
        memberId: selectedMember.memberId,
        bookId: selectedBookId
      });
      setShowIssueModal(false);
      setSuccess('Book issued successfully!');
      fetchMembers();
      fetchAvailableBooks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue book. Check if member has reached the 3-book limit.');
    }
  };

  const openIssueModal = (member) => {
    setSelectedMember(member);
    setShowIssueModal(true);
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Member Management</h2>
        <Button variant="success" onClick={() => setShowRegModal(true)}>Register New Member</Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Books Issued</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? members.map(m => (
            <tr key={m.memberId}>
              <td>{m.memberId}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>
                {m.issues && m.issues.filter(i => !i.returnDate).length > 0 ? (
                  m.issues.filter(i => !i.returnDate).map(i => (
                    <Badge bg="info" key={i.issueId} className="me-1" style={{fontSize: '0.7rem'}}>
                      {i.book.title}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted small">None</span>
                )}
              </td>
              <td>
                <Button size="sm" variant="outline-primary" onClick={() => openIssueModal(m)}>Issue Book</Button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="text-center">No members found.</td></tr>
          )}
        </tbody>
      </Table>

      {/* Registration Modal */}
      <Modal show={showRegModal} onHide={() => setShowRegModal(false)}>
        <Modal.Header closeButton><Modal.Title>Register Member</Modal.Title></Modal.Header>
        <Form onSubmit={handleRegister}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRegModal(false)}>Cancel</Button>
            <Button variant="success" type="submit">Register</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Issue Book Modal */}
      <Modal show={showIssueModal} onHide={() => setShowIssueModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Issue Book to {selectedMember?.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleIssueBook}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Select Available Book</Form.Label>
              <Form.Select required value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
                <option value="">-- Select a Book --</option>
                {availableBooks.map(book => (
                  <option key={book.bookId} value={book.bookId}>{book.title} by {book.author}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowIssueModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={!selectedBookId}>Issue Book</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MemberManagement;
