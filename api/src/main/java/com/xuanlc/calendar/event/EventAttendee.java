package com.xuanlc.calendar.event;

import com.xuanlc.calendar.appuser.AppUser;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

@Entity
public class EventAttendee {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private EventInstance eventInstance;
    @ManyToOne
    private AppUser user;
    @Enumerated(EnumType.STRING)
    private Status status;
    private boolean isDeleted;

    public EventAttendee() {
    }

    public EventAttendee(EventInstance eventInstance, AppUser user, Status status, boolean isDeleted) {
        this.eventInstance = eventInstance;
        this.user = user;
        this.status = status;
        this.isDeleted = isDeleted;
    }

    public EventInstance getEventInstance() {
        return this.eventInstance;
    }

    public void setEventInstance(EventInstance eventInstance) {
        this.eventInstance = eventInstance;
    }

    public AppUser getUser() {
        return this.user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public boolean isIsDeleted() {
        return this.isDeleted;
    }

    public boolean getIsDeleted() {
        return this.isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

}
