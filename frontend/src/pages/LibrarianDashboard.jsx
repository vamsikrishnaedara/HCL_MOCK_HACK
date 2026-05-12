import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookService, memberService, issueService } from '../services/api';
import { Spinner, Alert } from 'react-bootstrap';

const LibrarianDashboard = () => {
  const [stats, setStats] = useState({
    books: 0,
    members: 0,
    issues: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, membersRes] = await Promise.all([
          bookService.getAllBooks(),
          memberService.getAllMembers()
        ]);

        // Assuming issues are filtered from books or there's an endpoint
        // For now, let's try to get all issues if endpoint exists, 
        // otherwise count books where availability is false
        let issuesCount = 0;
        try {
            const issuesRes = await issueService.getAllIssues();
            issuesCount = issuesRes.data.length;
        } catch (e) {
            issuesCount = booksRes.data.filter(b => !b.availability).length;
        }

        setStats({
          books: booksRes.data.length,
          members: membersRes.data.length,
          issues: issuesCount
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load real-time statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;

  return (
    <div className="mt-4">
      <div className="p-5 mb-4 bg-light rounded-3 border-start border-5 border-primary">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Librarian Administration</h1>
          <p className="col-md-8 fs-4 text-muted">Academic Resources Management Portal. Oversee collection growth and member engagement.</p>
          <div className="d-flex gap-3 mt-4">
            <Link to="/librarian/books" className="btn btn-primary btn-lg px-4">Manage Collection</Link>
            <Link to="/librarian/members" className="btn btn-outline-dark btn-lg px-4">Member Directory</Link>
          </div>
        </div>
      </div>

      {error && <Alert variant="warning">{error} Showing cached/estimated data.</Alert>}

      <div className="row g-4 mb-5">
          <div className="col-md-4">
              <div className="card h-100 text-center p-4">
                  <div className="card-body">
                      <h3 className="card-title h5">Inventory</h3>
                      <p className="display-6 fw-bold">{stats.books}</p>
                      <small className="text-muted">Total Volumes</small>
                  </div>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card h-100 text-center p-4">
                  <div className="card-body">
                      <h3 className="card-title h5">Circulation</h3>
                      <p className="display-6 fw-bold">{stats.issues}</p>
                      <small className="text-muted">Active Issues</small>
                  </div>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card h-100 text-center p-4">
                  <div className="card-body">
                      <h3 className="card-title h5">Patrons</h3>
                      <p className="display-6 fw-bold">{stats.members}</p>
                      <small className="text-muted">Registered Members</small>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
