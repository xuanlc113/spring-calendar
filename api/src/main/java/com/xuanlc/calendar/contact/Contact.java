package com.xuanlc.calendar.contact;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.xuanlc.calendar.appuser.AppUser;

@Entity
public class Contact {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private AppUser user;
    @ManyToOne
    private AppUser contact;
    private boolean isAccepted;

    public Contact() {
    }

    public Contact(AppUser user, AppUser contact, boolean isAccepted) {
        this.user = user;
        this.contact = contact;
        this.isAccepted = isAccepted;
    }

    public AppUser getuserId() {
        return user;
    }

    public void setUserId(AppUser user) {
        this.user = user;
    }

    public AppUser getContactlId() {
        return contact;
    }

    public void setContactId(AppUser contact) {
        this.contact = contact;
    }

    public boolean getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(boolean isAccepted) {
        this.isAccepted = isAccepted;
    }

}
