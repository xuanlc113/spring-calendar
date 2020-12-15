package com.xuanlc.calendar.event;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.xuanlc.calendar.appuser.AppUser;

@Entity
public class UserEvent {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private AppUser user;
    @ManyToOne
    private Event event;
    private LocalDateTime datetime;
    @Enumerated(EnumType.ORDINAL)
    private Status status;

    public UserEvent() {
    }

    public UserEvent(AppUser user, Event event, LocalDateTime datetime, Status status) {
        this.user = user;
        this.event = event;
        this.datetime = datetime;
        this.status = status;
    }

    public AppUser getUser() {
        return this.user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public Event getEvent() {
        return this.event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public LocalDateTime getDatetime() {
        return this.datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

}
