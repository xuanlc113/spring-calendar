package com.xuanlc.calendar.event;

import java.time.Instant;
import java.util.List;

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
    private EventCanonical eventCanonical;
    private Instant datetime;
    @JsonIgnore
    @OneToMany(mappedBy = "eventInstance")
    private List<EventAttendee> attendees;

    public EventInstance() {
    }

    public EventInstance(EventCanonical eventCanonical, Instant datetime) {
        this.eventCanonical = eventCanonical;
        this.datetime = datetime;
    }

    public EventCanonical getEventCanonical() {
        return this.eventCanonical;
    }

    public void setEventCanonical(EventCanonical eventCanonical) {
        this.eventCanonical = eventCanonical;
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
