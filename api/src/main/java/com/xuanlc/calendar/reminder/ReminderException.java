package com.xuanlc.calendar.reminder;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class ReminderException {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private Reminder reminder;
    private LocalDateTime datetime;

    public ReminderException() {
    }

    public ReminderException(Reminder reminder, LocalDateTime datetime) {
        this.reminder = reminder;
        this.datetime = datetime;
    }

    public Reminder getReminder() {
        return this.reminder;
    }

    public void setReminder(Reminder reminder) {
        this.reminder = reminder;
    }

    public LocalDateTime getDatetime() {
        return this.datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

}
