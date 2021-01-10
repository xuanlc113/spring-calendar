package com.xuanlc.calendar.contact;

import com.xuanlc.calendar.appuser.AppUser;
import com.xuanlc.calendar.appuser.UserService;
import com.xuanlc.calendar.dto.ContactRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private UserService userService;

    public List<Contact> getContacts(Long id) {
        return contactRepository.findBySenderIdAndIsAcceptedTrue(id);
    }

    public List<Contact> getContactRequests(Long id) {
        return contactRepository.findByReceiverIdAndIsAcceptedFalse(id);
    }

    public void putContactRequest(ContactRequest request) {
        Contact contact = new Contact();
        AppUser sender = userService.getUser(request.getSender());
        AppUser receiver = userService.getUser(request.getReceiver());
        contact.setSender(sender);
        contact.setReceiver(receiver);
        contact.setIsAccepted(false);
        contactRepository.save(contact);
    }

    public void acceptContactRequest(Long id) {
        Contact contact = contactRepository.findById(id).get();
        contact.setIsAccepted(true);
        contactRepository.save(contact);
    }

    public void deleteContactRequest(Long id) {
        contactRepository.deleteById(id);
    }
}
