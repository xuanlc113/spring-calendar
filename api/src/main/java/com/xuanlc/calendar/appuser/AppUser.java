package com.xuanlc.calendar.appuser;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.xuanlc.calendar.contact.Contact;
import com.xuanlc.calendar.event.EventCanonical;
import com.xuanlc.calendar.event.EventAttendee;

@Entity
public class AppUser {

    @Id
    private long id;
    private String email;
    @OneToMany(mappedBy = "user")
    private List<EventCanonical> eventCanonical;
    @OneToMany(mappedBy = "user")
    private List<EventAttendee> events;
    // @OneToMany(mappedBy = "sender")
    // private List<Contact> sender;
    // @OneToMany(mappedBy = "receiver")
    // private List<Contact> receiver;

    public AppUser() {
    }

    public AppUser(long id, String email) {
        this.id = id;
        this.email = email;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<EventCanonical> getEventCanonical() {
        return this.eventCanonical;
    }

    public void setEventCanonical(List<EventCanonical> eventCanonical) {
        this.eventCanonical = eventCanonical;
    }

    public List<EventAttendee> getEvents() {
        return this.events;
    }

    public void setEvents(List<EventAttendee> events) {
        this.events = events;
    }

    // public List<Contact> getSender() {
    // return this.sender;
    // }

    // public void setSender(List<Contact> sender) {
    // this.sender = sender;
    // }

    // public List<Contact> getReceiver() {
    // return this.receiver;
    // }

    // public void setReceiver(List<Contact> receiver) {
    // this.receiver = receiver;
    // }

}