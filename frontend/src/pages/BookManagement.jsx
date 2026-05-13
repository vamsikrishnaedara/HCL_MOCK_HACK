import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import { bookService } from '../services/api';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await bookService.getAllBooks();
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Is the backend running?');
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await bookService.addBook(newBook);
      setNewBook({ title: '', author: '' });
      setShowModal(false);
      fetchBooks();
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book.');
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Book Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>Add New Book</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Current Borrower</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? books.map(book => (
            <tr key={book.bookId}>
              <td>{book.bookId}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <span className={`badge bg-${book.available ? 'success' : 'secondary'}`}>
                  {book.available ? 'Available' : 'Issued'}
                </span>
              </td>
              <td>
                {!book.available && book.issues ? (
                  book.issues.find(i => !i.returnDate)?.member?.name || 'Unknown'
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="text-center">No books found.</td></tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddBook}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                required 
                value={newBook.title}
                onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control 
                type="text" 
                required 
                value={newBook.author}
                onChange={(e) => setNewBook({...newBook, author: e.target.value})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Add Book</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default BookManagement;
