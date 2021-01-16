package com.xuanlc.calendar.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import com.xuanlc.calendar.appuser.AppUser;
import com.xuanlc.calendar.event.EventCanonical;

public class EventInfo {

    private UUID userId;
    private String title;
    private String description;
    private List<UUID> attendees;
    private Instant datetimeStart;
    private Instant dateEnd;
    private Integer duration;
    private boolean allDay;
    private boolean recurring;
    private String rrule;

    public EventInfo(UUID userId, String title, String description, List<UUID> attendees, Instant datetimeStart,
            Instant dateEnd, Integer duration, boolean allDay, boolean recurring, String rrule) {
        this.userId = userId;
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

    public EventCanonical convertToEntity(AppUser user, List<AppUser> attendees) {
        EventCanonical event = new EventCanonical(user, this.title, this.description, attendees, this.datetimeStart,
                this.dateEnd, this.duration, this.allDay, this.recurring, this.rrule);
        return event;
    }

    public UUID getUserId() {
        return this.userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
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

    public List<UUID> getAttendees() {
        return this.attendees;
    }

    public void setAttendees(List<UUID> attendees) {
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

}
