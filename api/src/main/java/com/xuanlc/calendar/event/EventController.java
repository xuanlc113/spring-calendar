package com.xuanlc.calendar.event;

import com.xuanlc.calendar.dto.EventInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/event")
    public void putEvent(@RequestBody EventInfo event) {
        eventService.addEvent(event);
    }

    @PostMapping("/event/i")
    public void getEvent(@RequestBody EventInfo event) {
        System.out.println(event.getDatetimeStart());
    }
}
