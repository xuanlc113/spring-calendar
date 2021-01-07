package com.xuanlc.calendar.event;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;

@Entity
public class EventInstance {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private EventCanonical eventCanonical;
    private LocalDateTime datetime;
    @OneToMany(mappedBy = "eventInstance")
    private List<EventAttendee> attendees;

    public EventInstance() {
    }

    public EventInstance(EventCanonical eventCanonical, LocalDateTime datetime, List<EventAttendee> attendees) {
        this.eventCanonical = eventCanonical;
        this.datetime = datetime;
        this.attendees = attendees;
    }

    public EventCanonical getEventCanonical() {
        return this.eventCanonical;
    }

    public void setEventCanonical(EventCanonical eventCanonical) {
        this.eventCanonical = eventCanonical;
    }

    public LocalDateTime getDatetime() {
        return this.datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public List<EventAttendee> getAttendees() {
        return this.attendees;
    }

    public void setAttendees(List<EventAttendee> attendees) {
        this.attendees = attendees;
    }

}
