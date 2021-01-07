package com.xuanlc.calendar.event;

import com.xuanlc.calendar.appuser.AppUser;

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

    public void addEvent(EventCanonical event) {
        AppUser a = new AppUser();
        a.setId(1231);
        a.setEmail("emailsdf");
        event.setUser(a);
        canonicalRepo.save(event);
    }
}
