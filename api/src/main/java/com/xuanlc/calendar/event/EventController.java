package com.xuanlc.calendar.event;

import java.util.List;
import java.time.Instant;

import com.xuanlc.calendar.dto.EventInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/event/{userId}")
    public List<EventAttendee> getEvents(@PathVariable Long userId,
            @RequestParam("start") @DateTimeFormat(iso = ISO.DATE_TIME) String start,
            @RequestParam("end") @DateTimeFormat(iso = ISO.DATE_TIME) String end) {
        Instant startInstant = Instant.parse(start);
        Instant endInstant = Instant.parse(end);
        return eventService.getEvents(userId, startInstant, endInstant);
    }

    @PostMapping("/event")
    public void putEvent(@RequestBody EventInfo event) {
        eventService.addEvent(event);
    }

    @PutMapping("/event/{canonicalId}")
    public void updateEvent(@PathVariable Long canonicalId, @RequestBody EventInfo event) {
        eventService.updateEvent(canonicalId, event);
    }

    @DeleteMapping("/event/instance/{instanceId}")
    public void deleteEventInstance(@PathVariable Long instanceId) {
        eventService.deleteEventInstance(instanceId);
    }

    @DeleteMapping("/event/instance/after/{instanceId}")
    public void deleteEventInstanceAndAfter(@PathVariable Long instanceId) {
        eventService.deleteEventInstanceAndAfter(instanceId);
    }

    @PutMapping("/event/attendee/{attendeeId}")
    public void updateAttendee(@PathVariable Long attendeeId, @RequestBody Integer status) {
        eventService.updateAttendee(attendeeId, status);
    }

    @DeleteMapping("/event/attendee/{attendeeId}")
    public void deleteAttendee(@PathVariable Long attendeeId) {
        eventService.deleteAttendee(attendeeId);
    }

    @DeleteMapping("/event/attendee/after/{attendeeId}")
    public void deleteAttendeeAndAfter(@PathVariable Long attendeeId) {
        eventService.deleteAttendeeAndAfter(attendeeId);
    }

}
