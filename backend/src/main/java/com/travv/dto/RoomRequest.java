package com.travv.dto;

import java.util.List;

public class RoomRequest {
    private int adults;
    private List<Integer> childrenAges;

    public int getAdults() {
        return adults;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public List<Integer> getChildrenAges() {
        return childrenAges;
    }

    public void setChildrenAges(List<Integer> childrenAges) {
        this.childrenAges = childrenAges;
    }
}
