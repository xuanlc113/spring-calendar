package com.xuanlc.calendar.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    @ManyToOne
    private EventInstance instance;
    @ManyToOne
    private AppUser user;
    @Enumerated(EnumType.STRING)
    private Status status;
    private boolean isDeleted;

    public EventAttendee() {
    }

    public EventAttendee(EventInstance instance, AppUser user, Status status, boolean isDeleted) {
        this.instance = instance;
        this.user = user;
        this.status = status;
        this.isDeleted = isDeleted;
    }

    public Long getId() {
        return this.id;
    }

    public EventInstance getInstance() {
        return this.instance;
    }

    public void setInstance(EventInstance instance) {
        this.instance = instance;
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

    public boolean isDeleted() {
        return this.isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

}
