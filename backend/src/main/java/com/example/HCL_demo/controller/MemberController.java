package com.example.HCL_demo.controller;

import com.example.HCL_demo.model.Member;
import com.example.HCL_demo.model.IssueRecord;
import com.example.HCL_demo.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private LibraryService libraryService;

    @GetMapping
    public List<Member> getAllMembers() {
        return libraryService.getAllMembers();
    }

    @PostMapping
    public Member registerMember(@RequestBody Member member) {
        return libraryService.registerMember(member);
    }

    @GetMapping("/{memberId}")
    public Member getMemberDetails(@PathVariable Long memberId) {
        return libraryService.getMemberDetails(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    @GetMapping("/{memberId}/issues")
    public List<IssueRecord> getBooksIssuedToMember(@PathVariable Long memberId) {
        return libraryService.getBooksIssuedToMember(memberId);
    }
}
