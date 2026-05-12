# Library Book Issue & Return Service - Project Plan

## Overview
A RESTful backend service to automate a college library's book issuing process. The system manages books, members, and issue/return records while enforcing business rules.

## Team Composition
- **Backend Developer 1 (Lead/Integration):** Architecture, Issue/Return logic, Database configuration.
- **Backend Developer 2 (Book Management):** CRUD operations for Books, Search functionality.
- **Backend Developer 3 (Member Management):** CRUD operations for Members, View member history.
- **Frontend Developer:** UI/UX design, API integration, Dashboard.

## 1. Core Data Model (JPA Entities)
### Book
- `Long bookId` (PK, Identity)
- `String title`
- `String author`
- `boolean available` (Default: true)

### Member
- `Long memberId` (PK, Identity)
- `String name`
- `String email` (Unique)

### IssueRecord
- `Long issueId` (PK, Identity)
- `Book book` (ManyToOne)
- `Member member` (ManyToOne)
- `LocalDate issueDate`
- `LocalDate returnDate` (Nullable)

## 2. API Specification (REST Endpoints)

| Feature | Method | Endpoint | Responsibility |
| :--- | :--- | :--- | :--- |
| **Book Management** | POST | `/books` | Backend 2 |
| | GET | `/books` | Backend 2 |
| | GET | `/books/available` | Backend 2 |
| | GET | `/books/search?query=...` | Backend 2 |
| **Member Management**| POST | `/members` | Backend 3 |
| | GET | `/members/{id}` | Backend 3 |
| | GET | `/members/{id}/issues`| Backend 3 |
| **Issue/Return** | POST | `/issues/issue` | Backend 1 |
| | PUT | `/issues/return/{id}`| Backend 1 |

## 3. Business Rules (Backend 1)
1. **Concurrency:** One book can be issued to only one member at a time (`available` flag).
2. **Quota:** A member can have a maximum of 3 **active** (non-returned) book issues.
3. **State Management:** When a book is issued, `available` becomes `false`. When returned, it becomes `true`.

## 4. Development Workflow
1. **Phase 1 (Sync):** Define common DTOs and Shared Entity models.
2. **Phase 2 (Parallel):** 
   - Backend 2 & 3 implement CRUD for Books and Members.
   - Frontend starts layout for Book Listing and Member Registration.
3. **Phase 3 (Integration):**
   - Backend 1 implements the `IssueBook` service with validation logic.
   - Frontend integrates the Issue/Return buttons.
4. **Phase 4 (Validation):** 
   - Postman testing for all endpoints.
   - Error handling (e.g., "Book Not Found", "Member Over Limit").

## 5. Technology Stack
- **Backend:** Spring Boot (Java 17), Spring Data JPA, H2 Database.
- **Frontend:** (To be decided - e.g., React, Angular, or Vanilla JS).
- **Documentation:** Swagger/OpenAPI (Optional but recommended).

---
*Note: Ensure all developers pull the latest changes frequently to avoid merge conflicts on the shared `IssueRecord` entity.*
