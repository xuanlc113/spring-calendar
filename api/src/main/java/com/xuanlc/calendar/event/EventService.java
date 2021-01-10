package com.xuanlc.calendar.event;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import com.xuanlc.calendar.appuser.AppUser;
import com.xuanlc.calendar.appuser.UserService;
import com.xuanlc.calendar.dto.EventInfo;
import com.xuanlc.calendar.helper.Helper;

import org.dmfs.rfc5545.DateTime;
import org.dmfs.rfc5545.Duration;
import org.dmfs.rfc5545.recur.RecurrenceRule;
import org.dmfs.rfc5545.recur.RecurrenceRuleIterator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventCanonicalRepository canonicalRepo;
    @Autowired
    private EventInstanceRepository instanceRepo;
    @Autowired
    private EventAttendeeRepository attendeeRepo;
    @Autowired
    private EventExceptionRepository exceptionRepo;
    @Autowired
    private UserService userService;

    public void addEvent(EventInfo event) {
        AppUser creator = userService.getUser(event.getUserId());
        EventCanonical eventCanonical = event.convertToEntity(creator);
        canonicalRepo.save(eventCanonical);

        if (event.isIsRecurring()) {
            try {
                RecurrenceRule rule = new RecurrenceRule(event.getRrule());
                System.out.println("init " + event.getDatetimeStart());
                DateTime start = Helper.convertToDT(event.getDatetimeStart());
                DateTime end;
                System.out.println("start " + start);
                if (event.getDateEnd() == null) {
                    Duration duration = new Duration(1, 365, 0);
                    end = start.addDuration(duration);
                } else {
                    end = Helper.convertToDT(event.getDateEnd());
                }
                RecurrenceRuleIterator it = rule.iterator(start);
                while (it.hasNext() && it.peekDateTime().before(end)) {
                    System.out.println("peek " + it.peekDateTime());
                    Instant nextDate = Helper.convertToInstant(it.nextDateTime());
                    System.out.println("ldt " + nextDate);
                    addSingleEvent(eventCanonical, nextDate);
                }
            } catch (Exception e) {
                System.out.println(e);
            }
        } else {
            Instant start = Helper.dayStart(event.getDatetimeStart());
            addSingleEvent(eventCanonical, start);
        }
    }

    public void addSingleEvent(EventCanonical event, Instant date) {
        EventInstance instance = new EventInstance(event, date);
        instanceRepo.save(instance);
        List<EventAttendee> attendees = new ArrayList<>();
        EventAttendee aa = new EventAttendee(instance, event.getUser(), Status.ACCEPTED);
        attendees.add(aa);
        for (Long id : event.getAttendees()) {
            AppUser attendee = userService.getUser(id);
            attendees.add(new EventAttendee(instance, attendee, Status.PENDING));
        }
        attendeeRepo.saveAll(attendees);
    }

}
