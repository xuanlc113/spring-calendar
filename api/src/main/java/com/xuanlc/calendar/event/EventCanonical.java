package com.xuanlc.calendar.event;

import com.xuanlc.calendar.appuser.AppUser;

import java.time.Instant;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.ElementCollection;

@Entity
public class EventCanonical {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private AppUser user;
    private String title;
    private String description;
    @ElementCollection
    private List<Long> attendees;
    private Instant datetimeStart;
    private Instant dateEnd;
    private Integer duration;
    private boolean isAllDay;
    private boolean isRecurring;
    private String rrule;
    @OneToMany(mappedBy = "eventCanonical")
    private List<EventInstance> events;
    @OneToMany(mappedBy = "eventCanonical")
    private List<EventException> exceptions;

    public EventCanonical() {
    }

    public EventCanonical(AppUser user, String title, String description, List<Long> attendees, Instant datetimeStart,
            Instant dateEnd, Integer duration, boolean isAllDay, boolean isRecurring, String rrule) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.attendees = attendees;
        this.datetimeStart = datetimeStart;
        this.dateEnd = dateEnd;
        this.duration = duration;
        this.isAllDay = isAllDay;
        this.isRecurring = isRecurring;
        this.rrule = rrule;
    }

    public AppUser getUser() {
        return this.user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Long> getAttendees() {
        return this.attendees;
    }

    public void setAttendees(List<Long> attendees) {
        this.attendees = attendees;
    }

    public Instant getDatetimeStart() {
        return this.datetimeStart;
    }

    public void setDatetimeStart(Instant datetimeStart) {
        this.datetimeStart = datetimeStart;
    }

    public Instant getDateEnd() {
        return this.dateEnd;
    }

    public void setDateEnd(Instant dateEnd) {
        this.dateEnd = dateEnd;
    }

    public Integer getDuration() {
        return this.duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public boolean isIsAllDay() {
        return this.isAllDay;
    }

    public boolean getIsAllDay() {
        return this.isAllDay;
    }

    public void setIsAllDay(boolean isAllDay) {
        this.isAllDay = isAllDay;
    }

    public boolean isIsRecurring() {
        return this.isRecurring;
    }

    public boolean getIsRecurring() {
        return this.isRecurring;
    }

    public void setIsRecurring(boolean isRecurring) {
        this.isRecurring = isRecurring;
    }

    public String getRrule() {
        return this.rrule;
    }

    public void setRrule(String rrule) {
        this.rrule = rrule;
    }

    public List<EventInstance> getEvents() {
        return this.events;
    }

    public void setEvents(List<EventInstance> events) {
        this.events = events;
    }

    public List<EventException> getExceptions() {
        return this.exceptions;
    }

    public void setExceptions(List<EventException> exceptions) {
        this.exceptions = exceptions;
    }

}
