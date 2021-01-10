package com.xuanlc.calendar.helper;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

import org.dmfs.rfc5545.DateTime;

public class Helper {

    public static DateTime convertToDT(Instant datetime) {
        return new DateTime(dayStart(datetime).toEpochMilli());
    }

    public static Instant convertToInstant(DateTime datetime) {
        return Instant.ofEpochMilli(datetime.getTimestamp());
        // return Instant.ofInstant(instance, ZoneId.systemDefault());
    }

    public static Instant dayStart(Instant instant) {
        return instant.atZone(ZoneOffset.UTC).withHour(0).withMinute(0).withSecond(0).withNano(0).toInstant();
    }
}
