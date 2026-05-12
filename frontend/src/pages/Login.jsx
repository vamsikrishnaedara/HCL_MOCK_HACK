import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await authService.login(username, password);
      if (user.role === 'LIBRARIAN') {
        navigate('/librarian');
      } else {
        navigate('/member');
      }
      window.location.reload(); // Refresh to update Navbar
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="shadow-lg border-0 rounded-lg">
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <span style={{ fontSize: '3rem' }}>🏛️</span>
              <h2 className="mt-2">Library Portal</h2>
              <p className="text-muted">Academic Resources Access</p>
            </div>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-4" id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  required 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Enter your username"
                />
              </Form.Group>
              <Form.Group className="mb-4" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 py-2 btn-primary" type="submit">
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center mt-3 text-muted">
            <small>Librarian Default: librarian / librarian123</small>
        </div>
      </div>
    </Container>
  );
};

export default Login;
