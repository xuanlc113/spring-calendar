package com.xuanlc.calendar.dto;

import java.util.UUID;

public class ContactRequest {

    private UUID sender;
    private UUID receiver;

    public ContactRequest(UUID sender, UUID receiver) {
        this.sender = sender;
        this.receiver = receiver;
    }

    public UUID getSender() {
        return this.sender;
    }

    public void setSender(UUID sender) {
        this.sender = sender;
    }

    public UUID getReceiver() {
        return this.receiver;
    }

    public void setReceiver(UUID receiver) {
        this.receiver = receiver;
    }

}
