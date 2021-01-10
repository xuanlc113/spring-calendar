package com.xuanlc.calendar.dto;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xuanlc.calendar.appuser.AppUser;
import com.xuanlc.calendar.event.EventCanonical;

public class EventInfo {

    private Long userId;
    private String title;
    private String description;
    private List<Long> attendees;
    private Instant datetimeStart;
    private Instant dateEnd;
    private Integer duration;
    private boolean isAllDay;
    private boolean isRecurring;
    private String rrule;

    public EventInfo(Long userId, String title, String description, List<Long> attendees, Instant datetimeStart,
            Instant dateEnd, Integer duration, boolean isAllDay, boolean isRecurring, String rrule) {
        this.userId = userId;
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

    public EventCanonical convertToEntity(AppUser user) {
        EventCanonical event = new EventCanonical(user, this.title, this.description, this.attendees,
                this.datetimeStart, this.dateEnd, this.duration, this.isAllDay, this.isRecurring, this.rrule);
        return event;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
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

}
