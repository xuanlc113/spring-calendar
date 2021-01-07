package com.xuanlc.calendar.event;

import java.util.List;

import com.xuanlc.calendar.appuser.AppUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/event")
    public void putEvent(@RequestBody EventCanonical event) {
        eventService.addEvent(event);
    }
}
