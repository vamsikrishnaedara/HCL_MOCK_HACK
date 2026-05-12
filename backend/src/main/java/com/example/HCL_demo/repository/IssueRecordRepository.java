package com.example.HCL_demo.repository;

import com.example.HCL_demo.model.IssueRecord;
import com.example.HCL_demo.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
    List<IssueRecord> findByMember(Member member);
    long countByMemberAndReturnDateIsNull(Member member);
}
