package com.xuanlc.calendar.event;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.xuanlc.calendar.appuser.AppUser;

@Entity
public class Event {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private AppUser user;
    private String title;
    private String description;
    private LocalDateTime datetime;
    private Integer duration;
    private boolean isAllDay;
    private boolean isRepeating;
    private String repeatPattern;
    private LocalDateTime repeatUntil;

    public Event() {
    }

    public Event(AppUser user, String title, String description, LocalDateTime datetime, Integer duration,
            boolean isAllDay, boolean isRepeating, String repeatPattern, LocalDateTime repeatUntil) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.datetime = datetime;
        this.duration = duration;
        this.isAllDay = isAllDay;
        this.isRepeating = isRepeating;
        this.repeatPattern = repeatPattern;
        this.repeatUntil = repeatUntil;
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

    public LocalDateTime getDatetime() {
        return this.datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
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

    public boolean isIsRepeating() {
        return this.isRepeating;
    }

    public boolean getIsRepeating() {
        return this.isRepeating;
    }

    public void setIsRepeating(boolean isRepeating) {
        this.isRepeating = isRepeating;
    }

    public String getRepeatPattern() {
        return this.repeatPattern;
    }

    public void setRepeatPattern(String repeatPattern) {
        this.repeatPattern = repeatPattern;
    }

    public LocalDateTime getRepeatUntil() {
        return this.repeatUntil;
    }

    public void setRepeatUntil(LocalDateTime repeatUntil) {
        this.repeatUntil = repeatUntil;
    }

}
