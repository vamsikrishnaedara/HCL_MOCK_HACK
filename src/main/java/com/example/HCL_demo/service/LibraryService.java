package com.example.HCL_demo.service;

import com.example.HCL_demo.model.Book;
import com.example.HCL_demo.model.IssueRecord;
import com.example.HCL_demo.model.Member;
import com.example.HCL_demo.model.User;
import com.example.HCL_demo.repository.BookRepository;
import com.example.HCL_demo.repository.IssueRecordRepository;
import com.example.HCL_demo.repository.MemberRepository;
import com.example.HCL_demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private IssueRecordRepository issueRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    // User Management
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Book Management
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailableTrue();
    }

    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }

    // Member Management
    @Transactional
    public Member registerMember(Member member) {
        if (member.getUser() != null) {
            User user = member.getUser();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(com.example.HCL_demo.model.Role.MEMBER);
            // No need to explicitly save user if cascade is ALL, but let's be safe or just let cascade handle it
        }
        return memberRepository.save(member);
    }

    public Optional<Member> getMemberDetails(Long memberId) {
        return memberRepository.findById(memberId);
    }

    public List<IssueRecord> getBooksIssuedToMember(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        return member.map(issueRecordRepository::findByMember).orElse(List.of());
    }

    // Issue Book
    @Transactional
    public IssueRecord issueBook(Long bookId, Long memberId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        if (!book.isAvailable()) {
            throw new RuntimeException("Book is already issued");
        }

        long activeIssues = issueRecordRepository.countByMemberAndReturnDateIsNull(member);
        if (activeIssues >= 3) {
            throw new RuntimeException("Member cannot issue more than 3 books");
        }

        book.setAvailable(false);
        bookRepository.save(book);

        IssueRecord record = new IssueRecord();
        record.setBook(book);
        record.setMember(member);
        record.setIssueDate(LocalDate.now());
        return issueRecordRepository.save(record);
    }

    // Return Book
    @Transactional
    public IssueRecord returnBook(Long issueId) {
        IssueRecord record = issueRecordRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue record not found"));

        if (record.getReturnDate() != null) {
            throw new RuntimeException("Book is already returned");
        }

        record.setReturnDate(LocalDate.now());
        
        Book book = record.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        return issueRecordRepository.save(record);
    }
}
