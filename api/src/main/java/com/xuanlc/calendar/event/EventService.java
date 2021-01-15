package com.xuanlc.calendar.event;

import com.xuanlc.calendar.appuser.AppUser;
import com.xuanlc.calendar.appuser.UserService;
import com.xuanlc.calendar.dto.EventInfo;
import com.xuanlc.calendar.helper.Helper;

import java.util.List;
import java.util.UUID;
import java.util.ArrayList;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.dmfs.rfc5545.DateTime;
import org.dmfs.rfc5545.Duration;
import org.dmfs.rfc5545.recur.RecurrenceRule;
import org.dmfs.rfc5545.recur.RecurrenceRuleIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventService {

    @Autowired
    private EventCanonicalRepository canonicalRepo;
    @Autowired
    private EventInstanceRepository instanceRepo;
    @Autowired
    private EventAttendeeRepository attendeeRepo;
    @Autowired
    private UserService userService;

    public List<EventAttendee> getEvents(UUID userId, Instant start, Instant end) {
        return attendeeRepo.findByUserIdAndInstanceDatetimeBetweenAndIsDeletedFalseAndInstanceCanonIsAllDayFalse(userId,
                start, end);
    }

    public List<EventAttendee> getAllDayEvents(UUID userId, Instant start, Instant end) {
        return attendeeRepo.findByUserIdAndInstanceDatetimeBetweenAndIsDeletedFalseAndInstanceCanonIsAllDayTrue(userId,
                start, end);
    }

    public void addEvent(EventInfo event) {
        AppUser creator = userService.getUser(event.getUserId());
        List<AppUser> attendees = userService.getUsersFromIds(event.getAttendees());
        EventCanonical eventCanonical = event.convertToEntity(creator, attendees);
        canonicalRepo.save(eventCanonical);

        if (event.isIsRecurring()) {
            try {
                RecurrenceRule rule = new RecurrenceRule(event.getRrule());
                DateTime start = Helper.convertToDT(event.getDatetimeStart());
                DateTime end;
                if (event.getDateEnd() == null) {
                    Duration oneYear = new Duration(1, 365, 0);
                    end = start.addDuration(oneYear);
                } else {
                    end = Helper.convertToDT(event.getDateEnd());
                }
                RecurrenceRuleIterator it = rule.iterator(start);
                while (it.hasNext() && it.peekDateTime().before(end)) {
                    Instant nextDate = Helper.convertToInstant(it.nextDateTime());
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
        for (AppUser a : event.getAttendees()) {
            attendees.add(new EventAttendee(instance, a, Status.PENDING, false));
        }
        attendeeRepo.saveAll(attendees);
    }

    @Transactional
    public void updateEvent(Long canonicalId, EventInfo event) {
        attendeeRepo.deleteByInstanceCanonId(canonicalId);
        instanceRepo.deleteByCanonId(canonicalId);
        canonicalRepo.deleteById(canonicalId);

        addEvent(event);
    }

    @Transactional
    public void deleteEventInstance(Long instanceId) {
        EventInstance instance = instanceRepo.findById(instanceId).get();
        Long canonicalId = instance.getCanon().getId();
        attendeeRepo.deleteByInstanceId(instanceId);
        instanceRepo.deleteById(instanceId);
        if (!instance.getCanon().isRecurring()) {
            canonicalRepo.deleteById(canonicalId);
        }
    }

    @Transactional
    public void deleteEventInstanceAndAfter(Long instanceId) {
        EventInstance instance = instanceRepo.findById(instanceId).get();
        Long canonicalId = instance.getCanon().getId();
        Instant date = instance.getDatetime();
        List<EventAttendee> attendees = new ArrayList<>();
        List<EventInstance> instances = instanceRepo.findByCanonIdAndDatetimeGreaterThanEqual(canonicalId, date);
        for (EventInstance i : instances) {
            attendees.addAll(attendeeRepo.findByInstanceId(i.getId()));
        }
        attendeeRepo.deleteAll(attendees);
        instanceRepo.deleteAll(instances);

        Instant canonStart = Helper.dayStart(instance.getCanon().getDatetimeStart());
        if (canonStart.equals(date)) {
            canonicalRepo.deleteById(canonicalId);
        } else {
            EventCanonical canonical = canonicalRepo.findById(canonicalId).get();
            canonical.setDateEnd(date.minus(1, ChronoUnit.DAYS));
            canonicalRepo.save(canonical);
        }
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
        UUID userId = attendee.getUser().getId();
        Long canonicalId = attendee.getInstance().getCanon().getId();
        Instant date = attendee.getInstance().getDatetime();
        List<EventAttendee> attendees = attendeeRepo
                .findByUserIdAndInstanceCanonIdAndInstanceDatetimeGreaterThanEqual(userId, canonicalId, date);
        for (EventAttendee a : attendees) {
            a.setStatus(Status.DECLINED);
            a.setIsDeleted(true);
        }
        attendeeRepo.saveAll(attendees);
    }

}
