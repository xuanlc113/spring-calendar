package com.xuanlc.calendar.event;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

import com.xuanlc.calendar.appuser.AppUser;

@Entity
public class EventAttendee {
    
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private EventInstance eventInstance;
    @ManyToOne
    private AppUser user;
    @Enumerated(EnumType.ORDINAL)
    private Status status;

    public EventAttendee() {}

    public EventAttendee(EventInstance eventInstance, AppUser user, Status status) {
        this.eventInstance = eventInstance;
        this.user = user;
        this.status = status;
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
    
}
   
