package com.xuanlc.calendar.dto;

public class ContactRequest {

    private boolean isAccepted;
    private Long sender;
    private Long receiver;

    public ContactRequest(boolean isAccepted, Long sender, Long receiver) {
        this.isAccepted = isAccepted;
        this.sender = sender;
        this.receiver = receiver;
    }

    public boolean isIsAccepted() {
        return this.isAccepted;
    }

    public boolean getIsAccepted() {
        return this.isAccepted;
    }

    public void setIsAccepted(boolean isAccepted) {
        this.isAccepted = isAccepted;
    }

    public Long getSender() {
        return this.sender;
    }

    public void setSender(Long sender) {
        this.sender = sender;
    }

    public Long getReceiver() {
        return this.receiver;
    }

    public void setReceiver(Long receiver) {
        this.receiver = receiver;
    }

}
