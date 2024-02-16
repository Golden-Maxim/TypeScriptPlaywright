import { format, parse } from "date-fns";
import { DateTime } from 'luxon';

export default class TimeZoneUtils {
  static convertTimeZone(time: string, date: string, originalTimeZone: string, targetTimeZone: string): string {
    const inputDateTimeString: string = `${date} ${time} 2024`;
    const inputTimeZone: string = originalTimeZone;
    const outputTimeZone: string = targetTimeZone;

    // Parse the original date and time with the original time zone
    const localDateTime = DateTime.fromFormat(inputDateTimeString, 'dd MMM HH:mm yyyy', { zone: inputTimeZone });

    // Convert to the target time zone
    const targetDateTime = localDateTime.setZone(outputTimeZone);

    // Format the final date and time as desired
    const formattedDateTime: string = targetDateTime.toFormat('dd MMM HH:mm');
    return formattedDateTime;
}

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  static getDateFormatForLiveScore(date: Date) {
    const formattedDate = format(date, "yyyy-MM-dd");
    return formattedDate;
  }
}

// Example usage
// const result = TimeZoneUtils.convertTimeZone('12:34', '05 Feb', 'UTC', 'America/New_York');
// console.log(result);
