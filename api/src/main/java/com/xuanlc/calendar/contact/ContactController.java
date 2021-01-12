package com.xuanlc.calendar.contact;

import com.xuanlc.calendar.dto.ContactRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @GetMapping("/contact/authorized/{userId}")
    public List<Contact> getContacts(@PathVariable Long userId) {
        return contactService.getContacts(userId);
    }

    @GetMapping("/contact/requests/{userId}")
    public List<Contact> getContactRequests(@PathVariable Long userId) {
        return contactService.getContactRequests(userId);
    }

    @PostMapping("/contact")
    public void putContactRequest(@RequestBody ContactRequest request) {
        contactService.putContactRequest(request);
    }

    @PutMapping("/contact/{contactId}")
    public void acceptContactRequest(@PathVariable Long contactId) {
        contactService.acceptContactRequest(contactId);
    }

    @DeleteMapping("/contact/{contactId}")
    public void deleteContactRequest(@PathVariable Long contactId) {
        contactService.deleteContactRequest(contactId);
    }

}
