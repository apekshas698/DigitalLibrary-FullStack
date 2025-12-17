package com.example.digitalLibrary.DigitalLibrary.dto;

public class Bookdto
{
    private String id;
    private String title;
    private String author;
    private String category;
    private int copyavailable;

    public Bookdto(){}

    public Bookdto(String id,String title,String author,String category,int copyavailable)
    {
        this.id=id;
        this.title=title;
        this.author=author;
        this.category=category;
        this.copyavailable=copyavailable;
    }
    public String getId(){
        return id;}
    public void setId(String id){this.id=id;}
    public String geTitle(){return title;}
    public void setTitle(String title){this.title=title;}
    public String getAuthor(){return author;}
    public void setAuthor(String author){this.author=author;}
    public String getCategory(){return category;}
    public void setCategory(String category){this.category=category;}
    public int getCopyAvailable(){return copyavailable;}
    public void setCopyAvailable(int copyavailable){this.copyavailable=copyavailable;}


}
