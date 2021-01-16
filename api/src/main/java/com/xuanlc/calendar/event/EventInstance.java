package com.xuanlc.calendar.event;

import java.util.List;
import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class EventInstance {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private EventCanonical canon;
    private Instant datetime;
    @OneToMany(mappedBy = "instance")
    private List<EventAttendee> attendees;

    public EventInstance() {
    }

    public EventInstance(EventCanonical canon, Instant datetime) {
        this.canon = canon;
        this.datetime = datetime;
    }

    public Long getId() {
        return this.id;
    }

    public EventCanonical getCanon() {
        return this.canon;
    }

    public void setCanon(EventCanonical canon) {
        this.canon = canon;
    }

    public Instant getDatetime() {
        return this.datetime;
    }

    public void setDatetime(Instant datetime) {
        this.datetime = datetime;
    }

    public List<EventAttendee> getAttendees() {
        return this.attendees;
    }

    public void setAttendees(List<EventAttendee> attendees) {
        this.attendees = attendees;
    }

}
