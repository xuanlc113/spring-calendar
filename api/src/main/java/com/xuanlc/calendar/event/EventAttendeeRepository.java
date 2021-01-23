package com.xuanlc.calendar.event;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface EventAttendeeRepository extends CrudRepository<EventAttendee, Long> {

        List<EventAttendee> findByUserIdAndInstanceDatetimeBetweenAndIsDeletedFalseAndInstanceCanonAllDayFalse(
                        UUID userId, Instant start, Instant end);

        List<EventAttendee> findByUserIdAndInstanceCanonIdAndInstanceDatetimeGreaterThanEqual(UUID userId,
                        Long canonicalId, Instant date);

        void deleteByInstanceId(Long instanceId);

        List<EventAttendee> findByInstanceId(Long instanceId);

        void deleteByInstanceCanonId(Long canonicalId);

        @Query(value = "SELECT * FROM event_attendee ea \n"
                        + "INNER JOIN event_instance ei ON ea.instance_id = ei.id \n"
                        + "INNER JOIN event_canonical ec ON ei.canon_id = ec.id \n" + "WHERE ea.user_id = ?1 \n"
                        + "AND ea.is_deleted = FALSE \n" + "AND ec.all_day = TRUE \n"
                        + "AND daterange(date(?2), date(?3), '[]') && daterange(date(ei.datetime), date(ei.datetime) + ec.duration, '[]')", nativeQuery = true)
        List<EventAttendee> getAllDayEvents(UUID userId, Instant start, Instant end);
}
