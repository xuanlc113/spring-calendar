package com.xuanlc.calendar.contact;

import java.util.List;

import javax.websocket.server.PathParam;

import com.xuanlc.calendar.dto.ContactRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/contact")
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    @PostMapping("/contact")
    public void putContactRequest(@RequestBody ContactRequest request) {
        contactService.putContactRequest(request);
    }

    @PutMapping("/contact/{id}")
    public void updateContactRequest(@PathVariable Long id) { // ?

    }

}
