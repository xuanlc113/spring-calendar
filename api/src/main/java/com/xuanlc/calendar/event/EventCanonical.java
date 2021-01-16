package com.xuanlc.calendar.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xuanlc.calendar.appuser.AppUser;

import java.time.Instant;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;

@Entity
public class EventCanonical {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private AppUser user;
    private String title;
    private String description;
    @ManyToMany
    private List<AppUser> attendees;
    private Instant datetimeStart;
    private Instant dateEnd;
    private Integer duration;
    private boolean allDay;
    private boolean recurring;
    private String rrule;
    @JsonIgnore
    @OneToMany(mappedBy = "canon")
    private List<EventInstance> events;

    public EventCanonical() {
    }

    public EventCanonical(AppUser user, String title, String description, List<AppUser> attendees,
            Instant datetimeStart, Instant dateEnd, Integer duration, boolean allDay, boolean recurring, String rrule) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.attendees = attendees;
        this.datetimeStart = datetimeStart;
        this.dateEnd = dateEnd;
        this.duration = duration;
        this.allDay = allDay;
        this.recurring = recurring;
        this.rrule = rrule;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<AppUser> getAttendees() {
        return this.attendees;
    }

    public void setAttendees(List<AppUser> attendees) {
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

    public boolean isAllDay() {
        return this.allDay;
    }

    public boolean getAllDay() {
        return this.allDay;
    }

    public void setAllDay(boolean allDay) {
        this.allDay = allDay;
    }

    public boolean isRecurring() {
        return this.recurring;
    }

    public boolean getRecurring() {
        return this.recurring;
    }

    public void setRecurring(boolean recurring) {
        this.recurring = recurring;
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

}
