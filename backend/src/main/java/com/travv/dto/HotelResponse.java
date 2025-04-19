package com.travv.dto;

public class HotelResponse {
    private String name;
    private String address;
    private double price;
    private String imageUrl;

    public HotelResponse() {}

    public HotelResponse(String name, String address, double price, String imageUrl) {
        this.name = name;
        this.address = address;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
