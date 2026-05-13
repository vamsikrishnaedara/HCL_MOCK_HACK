package com.example.HCL_demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long issueId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("issues")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("issues")
    private Member member;

    private LocalDate issueDate;
    private LocalDate returnDate;
}
