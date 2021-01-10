package com.xuanlc.calendar.contact;

import com.xuanlc.calendar.appuser.AppUser;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Contact {

    @Id
    @GeneratedValue
    private long id;
    private boolean isAccepted;
    @ManyToOne
    private AppUser sender;
    @ManyToOne
    private AppUser receiver;

    public Contact() {
    }

    public Contact(AppUser sender, AppUser receiver, boolean isAccepted) {
        this.sender = sender;
        this.receiver = receiver;
        this.isAccepted = isAccepted;
    }

    public AppUser getSender() {
        return this.sender;
    }

    public void setSender(AppUser sender) {
        this.sender = sender;
    }

    public AppUser getReceiver() {
        return this.receiver;
    }

    public void setReceiver(AppUser receiver) {
        this.receiver = receiver;
    }

    public boolean getIsAccepted() {
        return this.isAccepted;
    }

    public void setIsAccepted(boolean isAccepted) {
        this.isAccepted = isAccepted;
    }

}
