package com.xuanlc.calendar.reminder;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.xuanlc.calendar.appuser.AppUser;

@Entity
public class Reminder {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private AppUser user;
    private String title;
    private LocalDateTime datetime;
    private boolean isAllDay;
    private boolean isRepeating;
    private String repeatPattern;
    private LocalDateTime repeatUntil;
    private Integer repeatCount;

    public Reminder() {
    }

    public Reminder(AppUser user, String title, LocalDateTime datetime, boolean isAllDay, boolean isRepeating,
            String repeatPattern, LocalDateTime repeatUntil, Integer repeatCount) {
        this.user = user;
        this.title = title;
        this.datetime = datetime;
        this.isAllDay = isAllDay;
        this.isRepeating = isRepeating;
        this.repeatPattern = repeatPattern;
        this.repeatUntil = repeatUntil;
        this.repeatCount = repeatCount;
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

    public LocalDateTime getDatetime() {
        return this.datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
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

    public Integer getRepeatCount() {
        return this.repeatCount;
    }

    public void setRepeatCount(Integer repeatCount) {
        this.repeatCount = repeatCount;
    }

}
