package com.xuanlc.calendar.contact;

import java.util.List;

import com.xuanlc.calendar.appuser.AppUser;
import com.xuanlc.calendar.appuser.UserController;
import com.xuanlc.calendar.dto.ContactRequest;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private UserController userController;

    public List<Contact> getAllContacts() {
        List<Contact> contacts = new ArrayList<>();
        contactRepository.findAll().forEach(contacts::add);
        return contacts;
    }

    public void putContactRequest(ContactRequest request) {
        Contact contact = new Contact();
        AppUser sender = userController.getUser(request.getSender());
        AppUser receiver = userController.getUser(request.getReceiver());
        contact.setSender(sender);
        contact.setReceiver(receiver);
        contact.setIsAccepted(false);
        contactRepository.save(contact);
    }
}
