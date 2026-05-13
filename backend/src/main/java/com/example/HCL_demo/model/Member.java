package com.example.HCL_demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String name;
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("member")
    private java.util.List<IssueRecord> issues;
}
