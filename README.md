# HCL Library Management System

A full-stack Library Management System built with Spring Boot and React. The system facilitates book management, member registration, and a secure book issue/return process with role-based access control.

## 🚀 Features

### For Librarians
- **Member Management:** Register new members (automatically creates user credentials).
- **Book Management:** Add new books to the catalog.
- **Inventory Control:** View all books, available books, and search by title or author.
- **Issue/Return System:** 
    - Issue books to members (validates availability and member quota).
    - Return issued books (updates inventory in real-time).
- **Quota Enforcement:** Automatically prevents members from issuing more than **3 books** simultaneously.

### For Members
- **Discovery:** Browse the full library catalog and check real-time availability.
- **Search:** Quickly find books by title or author.
- **Personal Dashboard:** (Coming Soon) View currently issued books and history.

## 🛠️ Technology Stack

- **Backend:** 
    - Java 17 / Spring Boot 4.0.6
    - Spring Security (Basic Auth + BCrypt)
    - Spring Data JPA
    - H2 In-Memory Database
- **Frontend:**
    - React 19 + Vite
    - Bootstrap 5 (Styling)
    - Axios (API Integration)
    - React Router 7

## 📂 Project Structure

```text
HCL_MOCK_HACK/
├── backend/            # Spring Boot Application
│   ├── src/            # Java source code and resources
│   └── pom.xml         # Maven dependencies
├── frontend/           # React Application
│   ├── src/            # React components and pages
│   └── package.json    # Node.js dependencies
└── README.md           # Project documentation
```

## ⚙️ Getting Started

### Prerequisites
- JDK 17 or higher
- Node.js 18 or higher
- Maven (or use the provided `./mvnw` wrapper)

### Step 1: Start the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
3. The server will start on `http://localhost:8080`.
4. **Default Credentials:**
    - **Librarian:** `librarian` / `librarian123`
    - **H2 Console:** `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`)

### Step 2: Start the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## 📡 API Endpoints

| Category | Method | Endpoint | Access |
| :--- | :--- | :--- | :--- |
| **Auth** | GET | `/auth/login` | Authenticated |
| **Books** | POST | `/books` | Librarian |
| | GET | `/books` | All |
| | GET | `/books/available` | All |
| | GET | `/books/search?query=...` | All |
| **Members** | POST | `/members` | Librarian |
| | GET | `/members/{id}` | Librarian |
| | GET | `/members/{id}/issues` | Librarian |
| **Issues** | POST | `/issues/issue` | Librarian |
| | PUT | `/issues/return/{id}` | Librarian |

## 📝 Business Rules
- **One book, one user:** A book can only be issued if its `available` flag is true.
- **Member Quota:** Each member is limited to a maximum of **3 active issues**.
- **Automated Returns:** Returning a book automatically marks it as available for the next user.

---
Developed as part of the HCL Mock Hackathon.
