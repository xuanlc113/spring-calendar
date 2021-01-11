package com.xuanlc.calendar.event;

import java.time.Instant;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EventInstanceRepository extends CrudRepository<EventInstance, Long> {

    List<EventInstance> findByEventCanonicalIdAndDatetimeGreaterThanEqual(Long canonicalId, Instant date);

    List<EventInstance> findByEventCanonicalId(Long canonicalId);

}
