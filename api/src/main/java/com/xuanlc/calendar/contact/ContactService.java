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

    public List<Contact> getContacts(Long userId) {
        return contactRepository.findBySenderIdAndIsAcceptedTrue(userId);
    }

    public List<Contact> getContactRequests(Long userId) {
        return contactRepository.findByReceiverIdAndIsAcceptedFalse(userId);
    }

    public void putContactRequest(ContactRequest request) {
        AppUser sender = userService.getUser(request.getSender());
        AppUser receiver = userService.getUser(request.getReceiver());
        Contact contact = new Contact(sender, receiver, false);
        contactRepository.save(contact);
    }

    public void acceptContactRequest(Long contactId) {
        Contact contact = contactRepository.findById(contactId).get();
        contact.setIsAccepted(true);
        contactRepository.save(contact);
    }

    public void deleteContactRequest(Long contactId) {
        contactRepository.deleteById(contactId);
    }
}
