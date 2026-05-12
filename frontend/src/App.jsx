import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { authService } from './services/api';

import BookManagement from './pages/BookManagement';
import MemberManagement from './pages/MemberManagement';
import MemberDashboard from './pages/MemberDashboard';
import BookCatalog from './pages/BookCatalog';
import LibrarianDashboard from './pages/LibrarianDashboard';
import Login from './pages/Login';

function App() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <span className="me-2" style={{fontSize: '1.5rem'}}>🏛️</span>
            UNIVERSITY LIBRARY
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user?.role === 'LIBRARIAN' && (
                <>
                  <Nav.Link as={Link} to="/librarian">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/librarian/books">Collection</Nav.Link>
                  <Nav.Link as={Link} to="/librarian/members">Patrons</Nav.Link>
                </>
              )}
              {user?.role === 'MEMBER' && (
                <>
                  <Nav.Link as={Link} to="/member">My Portal</Nav.Link>
                  <Nav.Link as={Link} to="/member/catalog">Search Catalog</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {user ? (
                <div className="d-flex align-items-center">
                    <span className="text-light me-3 small">Logged in as: <strong>{user.username}</strong></span>
                    <Button variant="outline-light" size="sm" onClick={handleLogout} className="px-3 rounded-pill border-opacity-50">
                        Logout
                    </Button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline-light btn-sm px-4 rounded-pill border-opacity-50">Sign In</Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {user?.role === 'MEMBER' && (
        <div className="hero-section">
            <Container className="text-center">
                <h1 className="display-3 mb-3">Academic Excellence Starts Here</h1>
                <p className="lead fs-3">Access millions of resources, journals, and digital archives.</p>
            </Container>
        </div>
      )}

      <Container className="pb-5">
        <Routes>
          <Route path="/" element={
            user ? (
                <Navigate to={user.role === 'LIBRARIAN' ? "/librarian" : "/member"} />
            ) : (
                <Navigate to="/login" />
            )
          } />
          
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

          {/* Librarian Routes */}
          <Route path="/librarian" element={user?.role === 'LIBRARIAN' ? <LibrarianDashboard /> : <Navigate to="/login" />} />
          <Route path="/librarian/books" element={user?.role === 'LIBRARIAN' ? <BookManagement /> : <Navigate to="/login" />} />
          <Route path="/librarian/members" element={user?.role === 'LIBRARIAN' ? <MemberManagement /> : <Navigate to="/login" />} />

          {/* Member Routes */}
          <Route path="/member" element={user?.role === 'MEMBER' ? <MemberDashboard /> : <Navigate to="/login" />} />
          <Route path="/member/catalog" element={user?.role === 'MEMBER' ? <BookCatalog /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </>
  );
}

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
