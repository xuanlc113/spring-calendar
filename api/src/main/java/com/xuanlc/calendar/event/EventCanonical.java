package com.xuanlc.calendar.event;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.ElementCollection;

import com.xuanlc.calendar.appuser.AppUser;

@Entity
public class EventCanonical {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private AppUser user;
    private String title;
    private String description;
    @ElementCollection
    private List<String> attendees;
    private LocalDateTime datetimeStart;
    private LocalDateTime dateEnd;
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

    public EventCanonical(AppUser user, String title, String description, List<String> attendees,
            LocalDateTime datetimeStart, LocalDateTime dateEnd, Integer duration, boolean isAllDay, boolean isRecurring,
            String rrule, List<EventInstance> events, List<EventException> exceptions) {
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
        this.events = events;
        this.exceptions = exceptions;
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

    public List<String> getAttendees() {
        return this.attendees;
    }

    public void setAttendees(List<String> attendees) {
        this.attendees = attendees;
    }

    public LocalDateTime getDatetimeStart() {
        return this.datetimeStart;
    }

    public void setDatetimeStart(LocalDateTime datetimeStart) {
        this.datetimeStart = datetimeStart;
    }

    public LocalDateTime getDateEnd() {
        return this.dateEnd;
    }

    public void setDateEnd(LocalDateTime dateEnd) {
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
