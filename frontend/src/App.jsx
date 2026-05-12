import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

import BookManagement from './pages/BookManagement';
import MemberManagement from './pages/MemberManagement';
import MemberDashboard from './pages/MemberDashboard';
import BookCatalog from './pages/BookCatalog';
import LibrarianDashboard from './pages/LibrarianDashboard';

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
