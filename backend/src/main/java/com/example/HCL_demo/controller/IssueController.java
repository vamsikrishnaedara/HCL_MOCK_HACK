package com.example.HCL_demo.controller;

import com.example.HCL_demo.model.IssueRecord;
import com.example.HCL_demo.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/issues")
public class IssueController {

    @Autowired
    private LibraryService libraryService;

    @PostMapping("/issue")
    public IssueRecord issueBook(@RequestBody Map<String, Long> request) {
        Long bookId = request.get("bookId");
        Long memberId = request.get("memberId");
        return libraryService.issueBook(bookId, memberId);
    }

    @PutMapping("/return/{issueId}")
    public IssueRecord returnBook(@PathVariable Long issueId) {
        return libraryService.returnBook(issueId);
    }
}
