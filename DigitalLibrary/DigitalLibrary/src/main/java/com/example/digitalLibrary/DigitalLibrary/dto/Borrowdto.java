package com.example.digitalLibrary.DigitalLibrary.dto;

import java.time.LocalDate;

public class Borrowdto
{
    private String id;
    private String userid;
    private String bookid;
    private LocalDate borrowdate;
    private LocalDate returndate;

    public Borrowdto(){}

    public Borrowdto(String id,String userid,String bookid,LocalDate borrowdate,LocalDate returndate){
        this.id=id;
        this.bookid=bookid;
        this.userid=userid;
        this.borrowdate=borrowdate;
        this.returndate=returndate;
    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userid; }
    public void setUserId(String userId) { this.userid = userId; }

    public String getBookId() { return bookid; }
    public void setBookId(String bookId) { this.bookid = bookId; }

    public LocalDate getBorrowDate() { return borrowdate; }
    public void setBorrowDate(LocalDate borrowDate) { this.borrowdate = borrowDate; }

    public LocalDate getReturnDate() { return returndate; }
    public void setReturnDate(LocalDate returnDate) { this.returndate = returnDate; }

}
