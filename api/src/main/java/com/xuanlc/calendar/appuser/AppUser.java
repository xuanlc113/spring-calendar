package com.xuanlc.calendar.appuser;

import com.xuanlc.calendar.event.EventCanonical;

import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class AppUser {

    @Id
    private UUID id;
    private String email;
    @ManyToMany(mappedBy = "attendees")
    @JsonIgnore
    private List<EventCanonical> events;

    public AppUser() {
    }

    public AppUser(UUID id, String email) {
        this.id = id;
        this.email = email;
    }

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<EventCanonical> getEvents() {
        return this.events;
    }

    public void setEvents(List<EventCanonical> events) {
        this.events = events;
    }

}