package com.xuanlc.calendar.contact;

import java.util.List;

import com.xuanlc.calendar.dto.ContactRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/contact/authorized")
    public List<Contact> getContacts(@RequestParam(value = "userId", required = true) Long id) {
        return contactService.getContacts(id);
    }

    @GetMapping("/contact/requests")
    public List<Contact> getContactRequests(@RequestParam(value = "userId", required = true) Long id) {
        return contactService.getContactRequests(id);
    }

    @PostMapping("/contact")
    public void putContactRequest(@RequestBody ContactRequest request) {
        contactService.putContactRequest(request);
    }

    @PutMapping("/contact/{id}")
    public void acceptContactRequest(@PathVariable Long id) {
        contactService.acceptContactRequest(id);
    }

    @DeleteMapping("/contact/{id}")
    public void deleteContactRequest(@PathVariable Long id) {
        contactService.deleteContactRequest(id);
    }

}
