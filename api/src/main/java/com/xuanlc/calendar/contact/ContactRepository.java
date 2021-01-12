package com.xuanlc.calendar.contact;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contact, Long> {

    List<Contact> findBySenderIdAndIsAcceptedTrue(Long userId);

    List<Contact> findByReceiverIdAndIsAcceptedFalse(Long userId);

}
