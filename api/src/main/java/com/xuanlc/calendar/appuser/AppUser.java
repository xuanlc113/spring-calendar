package com.xuanlc.calendar.appuser;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.xuanlc.calendar.contact.Contact;

@Entity
public class AppUser {

    @Id
    private String id;
    private String email;
    @OneToMany(mappedBy = "contact")
    private List<Contact> contacts;

    public AppUser() {
    }

    public AppUser(String id, String email, List<Contact> contacts) {
        this.id = id;
        this.email = email;
        this.contacts = contacts;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Contact> getContacts() {
        return this.contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

}