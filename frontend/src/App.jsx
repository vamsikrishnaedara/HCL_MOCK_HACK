import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

import BookManagement from './pages/BookManagement';
import MemberManagement from './pages/MemberManagement';
import MemberDashboard from './pages/MemberDashboard';
import BookCatalog from './pages/BookCatalog';

const LibrarianDashboard = () => (
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
    <div className="row g-4 mb-5">
        <div className="col-md-4">
            <div className="card h-100 text-center p-4">
                <div className="card-body">
                    <h3 className="card-title h5">Inventory</h3>
                    <p className="display-6 fw-bold">1,284</p>
                    <small className="text-muted">Total Volumes</small>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card h-100 text-center p-4">
                <div className="card-body">
                    <h3 className="card-title h5">Circulation</h3>
                    <p className="display-6 fw-bold">42</p>
                    <small className="text-muted">Active Issues</small>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card h-100 text-center p-4">
                <div className="card-body">
                    <h3 className="card-title h5">Patrons</h3>
                    <p className="display-6 fw-bold">856</p>
                    <small className="text-muted">Registered Members</small>
                </div>
            </div>
        </div>
    </div>
  </div>
);

function App() {
  const [role, setRole] = useState('Librarian'); // Default role

  const toggleRole = () => {
    setRole(prev => (prev === 'Librarian' ? 'Member' : 'Librarian'));
  };

  return (
    <Router>
      <Navbar variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <span className="me-2" style={{fontSize: '1.5rem'}}>🏛️</span>
            UNIVERSITY LIBRARY
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {role === 'Librarian' ? (
                <>
                  <Nav.Link as={Link} to="/librarian">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/librarian/books">Collection</Nav.Link>
                  <Nav.Link as={Link} to="/librarian/members">Patrons</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/member">My Portal</Nav.Link>
                  <Nav.Link as={Link} to="/member/catalog">Search Catalog</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <Button variant="outline-light" size="sm" onClick={toggleRole} className="px-3 rounded-pill border-opacity-50">
                Switch to {role === 'Librarian' ? 'Member' : 'Librarian'} Portal
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={role === 'Member' ? "hero-section" : "d-none"}>
        <Container className="text-center">
            <h1 className="display-3 mb-3">Academic Excellence Starts Here</h1>
            <p className="lead fs-3">Access millions of resources, journals, and digital archives.</p>
        </Container>
      </div>

      <Container className="pb-5">
        <Routes>
          <Route path="/" element={<Navigate to={role === 'Librarian' ? "/librarian" : "/member"} />} />
          
          {/* Librarian Routes */}
          <Route path="/librarian" element={<LibrarianDashboard />} />
          <Route path="/librarian/books" element={<BookManagement />} />
          <Route path="/librarian/members" element={<MemberManagement />} />

          {/* Member Routes */}
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/member/catalog" element={<BookCatalog />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
