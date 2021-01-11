package com.xuanlc.calendar.event;

import java.time.Instant;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EventInstanceRepository extends CrudRepository<EventInstance, Long> {

    List<EventInstance> findByCanonIdAndDatetimeGreaterThanEqual(Long canonicalId, Instant date);

    List<EventInstance> findByCanonId(Long canonicalId);

}
