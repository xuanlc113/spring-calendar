package com.xuanlc.calendar.contact;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contact, Long> {

    List<Contact> findBySenderIdAndIsAcceptedTrue(Long id);

    List<Contact> findByReceiverIdAndIsAcceptedFalse(Long id);

}
