package com.xuanlc.calendar.event;

import java.util.List;
import java.time.Instant;

import org.springframework.data.repository.CrudRepository;

public interface EventInstanceRepository extends CrudRepository<EventInstance, Long> {

    List<EventInstance> findByCanonIdAndDatetimeGreaterThanEqual(Long canonicalId, Instant date);

    void deleteByCanonId(Long canonicalId);

}
