package com.xuanlc.calendar.contact;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contact, Long> {

    List<Contact> findBySenderIdAndIsAcceptedTrue(UUID userId);

    List<Contact> findByReceiverIdAndIsAcceptedFalse(UUID userId);

}
