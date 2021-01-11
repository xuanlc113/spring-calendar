package com.xuanlc.calendar.event;

import com.xuanlc.calendar.appuser.AppUser;
import com.xuanlc.calendar.appuser.UserService;
import com.xuanlc.calendar.dto.EventInfo;
import com.xuanlc.calendar.helper.Helper;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

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

    public List<EventAttendee> getEvents(Long userId, Instant start, Instant End) {
        List<EventAttendee> attendees = new ArrayList<>();
        return attendees;
    }

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
        EventAttendee aa = new EventAttendee(instance, event.getUser(), Status.ACCEPTED, false);
        attendees.add(aa);
        for (Long id : event.getAttendees()) {
            AppUser attendee = userService.getUser(id);
            attendees.add(new EventAttendee(instance, attendee, Status.PENDING, false));
        }
        attendeeRepo.saveAll(attendees);
    }

    public void updateEvent(Long canonicalId, EventInfo event) {
        List<EventInstance> instances = instanceRepo.findByEventCanonicalId(canonicalId);
        List<EventAttendee> attendees = attendeeRepo.findByEventInstanceEventCanonicalId(canonicalId);
        instanceRepo.deleteAll(instances);
        attendeeRepo.deleteAll(attendees);
        canonicalRepo.deleteById(canonicalId);

        addEvent(event);
    }

    public void deleteEventInstance(Long instanceId) {
        EventInstance instance = instanceRepo.findById(instanceId).get();
        Long canonicalId = instance.getEventCanonical().getId();
        if (!instance.getEventCanonical().getIsRecurring()) {
            canonicalRepo.deleteById(canonicalId);
        }
        attendeeRepo.deleteByEventInstanceId(instanceId);
        instanceRepo.deleteById(instanceId);
    }

    public void deleteEventInstanceAndAfter(Long instanceId) {
        EventInstance instance = instanceRepo.findById(instanceId).get();
        Long canonicalId = instance.getEventCanonical().getId();
        Instant date = instance.getDatetime();
        List<EventAttendee> attendees = new ArrayList<>();
        List<EventInstance> instances = instanceRepo.findByEventCanonicalIdAndDatetimeGreaterThanEqual(canonicalId,
                date);
        for (EventInstance i : instances) {
            attendees.addAll(attendeeRepo.findByEventInstanceId(i.getId()));
        }
        attendeeRepo.deleteAll(attendees);
        instanceRepo.deleteAll(instances);

        EventCanonical canonical = canonicalRepo.findById(canonicalId).get();
        canonical.setDateEnd(date.minus(1, ChronoUnit.DAYS));
        canonicalRepo.save(canonical);
    }

    public void updateAttendee(Long attendeeId, Integer status) {
        EventAttendee attendee = attendeeRepo.findById(attendeeId).get();
        attendee.setStatus(Status.values()[status]);
        attendeeRepo.save(attendee);
    }

    public void deleteAttendee(Long attendeeId) {
        EventAttendee attendee = attendeeRepo.findById(attendeeId).get();
        attendee.setStatus(Status.DECLINED);
        attendee.setIsDeleted(true);
        attendeeRepo.save(attendee);
    }

    public void deleteAttendeeAndAfter(Long attendeeId) {
        EventAttendee attendee = attendeeRepo.findById(attendeeId).get();
        Long userId = attendee.getUser().getId();
        Long canonicalId = attendee.getEventInstance().getEventCanonical().getId();
        Instant date = attendee.getEventInstance().getDatetime();
        List<EventAttendee> attendees = attendeeRepo
                .findByUserIdAndEventInstanceEventCanonicalIdAndEventInstanceDatetimeAfter(userId, canonicalId, date);
        attendees.add(attendee);
        for (EventAttendee a : attendees) {
            a.setStatus(Status.DECLINED);
            a.setIsDeleted(true);
        }
        attendeeRepo.saveAll(attendees);
    }

}
