package com.xuanlc.calendar.event;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class EventException {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private EventCanonical eventCanonical;
    private Instant date;

    public EventException() {
    }

    public EventException(EventCanonical eventCanonical, Instant date) {
        this.eventCanonical = eventCanonical;
        this.date = date;
    }

    public EventCanonical getEventCanonical() {
        return this.eventCanonical;
    }

    public void setEventCanonical(EventCanonical eventCanonical) {
        this.eventCanonical = eventCanonical;
    }

    public Instant getDate() {
        return this.date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

}