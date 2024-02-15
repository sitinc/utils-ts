/**
 * MIT License
 *
 * Copyright (c) 2024, Justin Randall, Smart Interactive Transformations Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
import crypto from 'crypto';

export class Utils {
    private static ORDWORD_REGEX : RegExp = /^([0-9]+)(?:st|nd|rd|th)$/;

    /**
     * 
     * @returns the random UUID.
     */
    public static uuid(): string {
      return crypto.randomUUID();
    }

    /**
     * Check if a string is unset.
     *
     * @param {string} text The string
     * @returns true if the string is set; otherwise, false.
     */
    public static isNotSet(text: string, hasLength: boolean=true): boolean {
      return (text == null || text == undefined || text.length == 0);
    }

    /**
     * Check if an Object is set.
     *
     * @param {Object} obj The object
     * @returns true if the object is set; otherwise, false.
     */
    public static isObjSet(obj: Object): boolean {
      return (obj != null && obj != undefined);
    }

    /**
     * Check if a string is set.
     *
     * @param {string} text The string
     * @returns true if the string is set; otherwise, false.
     */
    public static isStrSet(text: string): boolean {
      return (text != null && text != undefined && text.length != 0);
    }

    /**
     * Check and extract the numeric part of an ordinal word.
     *
     * @param {string} word The word.
     * @returns { matched: true|false, numeric: [0-9]+|null }
     */
    public static isOrdWord(word: string): Object {
      const match = word.match(Utils.ORDWORD_REGEX);
      if (match == null) {
        return {
          matched: false,
          numeral: null,
        };
      }
      return {
        matched: true,
        numeral: match[1],
      };
    }

    /**
     * Return the ordinal word representation of a number.
     *
     * @param {number} num The number.
     * @returns the ordinal word representation.
     */
    public static numToOrdWord(num: number): string {
      const ordWord = Utils._numToOrdWord(num);
      return ordWord.replace(' zeroth', 'th');
    }

    /**
     * Return the ordinal word representation of a number.
     *
     * See - https://stackoverflow.com/questions/15998005/ordinals-in-words-javascript
     *
     * @param {number} num The number.
     * @returns the ordinal word representation.
     */
    private static _numToOrdWord(num: number): string {
      const n = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
        'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
        'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      const s = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
        'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
        'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth',
        'eighteenth', 'nineteenth'];
      const p = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight',
        'ninet'];
      const c = ['hundred', 'thousand', 'million', 'billion', 'trillion',
        'quadrillion', 'quintillion'];
      const b = Math.floor(Math.log10(num));
      if (num<20) return s[num]; // Special case for sub-20
      if (b==1) { // Between 21 and 99
        // On the tens, return p+"ieth"
        if (num%10 === 0) return p[Math.floor(num/10)-2]+'ieth';
        // Otherwise, return hyphenated
        return p[Math.floor(num/10)-2] + 'y-' + s[num%10];
      }
      if (b==2) { // Between 100 and 999
        const e = Math.floor(num/Math.pow(10, b)); // The first number
        return n[e-1]+
        '-'+
        c[0]+
        ' '+
        Utils._numToOrdWord(num-(e*Math.pow(10, b)));
      }
      // Greater than 1000 we break into groups of 10^3 followed by a multiplier
      const m = b%3 + 1; // Take the first m digits off
      const cm = Math.floor(b/3);
      const x = Math.floor(num/Math.pow(10, b-m+1));
      // Converts a number less than 1000 to its string representation as a
      // multiplier
      const numberToString = function(y: number): string {
        if (y<20) return n[y-1];
        if (y<100) return p[Math.floor(y/10)-2] + 'y-' + n[y%10-1];
        return n[Math.floor(y/100)-1] + ' ' + c[0] + ' ' +
          numberToString(y-(Math.floor(y/100)*100));
      };
      return numberToString(x) + ' ' + c[cm] + ' ' +
        Utils.numToOrdWord(num-(x*Math.pow(10, b-m+1)));
    }
    
    /**
     * Returns each word in a string with an uppercase first letter.
     * @param text The string
     * @returns a string with each word having an uppercase first letter.
     */
    public static upperWord(text: string): string {
        return text.charAt(0).toUpperCase()+
            text.substring(1);
    }
    
    /**
     * Returns a YYYY-MM string representation of a date.
     *
     * @param {Date} date   The date.
     * @returns The YYYY-MM string representation.
     */
    static getYmDate(date: Date): string {
        const dateString = date.toISOString().split('T')[0];
        return dateString.substring(0, dateString.length-3);
    }
    
    /**
     * Returns a YYYY-MM-DD string representation of a date.
     *
     * @param {Date} date   The date.
     * @returns The YYYY-MM-DD string representation.
     */
    static getYmdDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
    
    /**
     * Get a YYYYMMDDTHHMMSS string representation of a date.
     *
     * @param {Date} date           The date.
     * @param {boolean} incMillis   THe flag to include milliseconds in the response.
     * @returns The YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSsss string representation.
     */
    static getTs(date: Date, incMillis: boolean= false): string {
        const dateString = date.toISOString();
        if (incMillis) {
            return dateString
                .replace(/(?:[-:.TZ])/g, '')
                ;
        }
        return dateString
            .split('.')[0]
            .replace(/(?:[-:.TZ])/g, '')
            ;
    }
    
    /**
     * Increment a date by a number of work days.
     *
     * Taken from https://stackoverflow.com/questions/6499944/how-can-i-add-or-subtract-business-days-in-javascript
     *
     * @param {Date} date       The date.
     * @param {number} days     The number of working days.
     * @param {boolean} incSat  The flag to include saturdays.
     * @param {boolean} incSun  The flag to include sundays.
     * @returns the updated date.
     */
    public static incWorkDays(
            date: Date,
            days: number,
            incSat: boolean=false,
            incSun: boolean=false): Date {
        if (!(date instanceof Date)) {
            throw new Error('date value is not valid');
        }
        if (days == undefined || isNaN(days)) {
            throw new Error('days value is not valid');
        }

        const finalDays = days;

        let intWorkingDays = 5;
        let intNonWorkingDays = 2;
        const intStartDay = date.getDay(); // 0=Sunday ... 6=Saturday
        let intOffset;
        let intModifier = 0;

        if (incSat) {
            intWorkingDays++; intNonWorkingDays--;
        }
        if (incSun) {
            intWorkingDays++; intNonWorkingDays--;
        }
        const newDate = new Date(date);

        // Moving Forward
        if (!incSat && incSun) {
            intOffset = intStartDay;
        } else {
            intOffset = intStartDay - 1;
        }
        // Special start Saturday rule for 5 day week
        if (intStartDay == 6 && !incSat && !incSun) {
            intOffset -= 6;
            intModifier = 1;
        }

        // ~~ is used to achieve integer division for both positive and
        // negative numbers
        newDate.setTime(date.getTime() + (
        ((~~((finalDays + intOffset) / intWorkingDays) * intNonWorkingDays)
            + finalDays + intModifier) *
            86400000),
        );
        return newDate;
    }

    /**
     * Decrement a date by a number of work days.
     *
     * Taken from https://stackoverflow.com/questions/6499944/how-can-i-add-or-subtract-business-days-in-javascript
     *
     * @param {Date} date  The date.
     * @param {number} days     The number of working days.
     * @param {boolean} incSat Flag to include Saturday as a work day.
     * @param {boolean} incSun Flag to include Sunday as a work day.
     * @returns the updated date.
     */
    public static decWorkDays(
            date: Date,
            days: number,
            incSat: boolean=false,
            incSun: boolean=false): Date {
        if (!(date instanceof Date)) {
            throw new Error('date value is not valid');
        }
        if (days == undefined || isNaN(days)) {
            throw new Error('days value is not valid');
        }

        const finalDays = (days > 0) ?
        days * -1 :
        days;

        let intWorkingDays = 5;
        let intNonWorkingDays = 2;
        const intStartDay = date.getDay(); // 0=Sunday ... 6=Saturday
        let intOffset;
        let intModifier = 0;

        if (incSat) {
            intWorkingDays++; intNonWorkingDays--;
        }
        if (incSun) {
            intWorkingDays++; intNonWorkingDays--;
        }
        const newDate = new Date(date);

        // Moving Backward
        if (incSat && !incSun) {
            intOffset = intStartDay - 6;
        } else {
            intOffset = intStartDay - 5;
        }
        // Special start Sunday rule for 5 day week
        if (intStartDay == 0 && !incSat && !incSun) {
            intOffset++;
            intModifier = 1;
        }

        // ~~ is used to achieve integer division for both positive and
        // negative numbers
        newDate.setTime(date.getTime() + (
        ((~~((finalDays + intOffset) / intWorkingDays) * intNonWorkingDays) +
            finalDays + intModifier) *
            86400000),
        );
        return newDate;
    }

    /**
     * Format a date string to the preferred spoken format.
     * 
     * @param dateString The date string.
     * @param timeZoneOffsetHours The time zone offet hours.  Default is -5 (EST).
     * @return the preferred spoken format.
     */
    static formatDateTimeSpokenFull(dateString: string, timeZoneOffsetHours: number = -5): string {
      const date = new Date(dateString);
      date.setUTCHours(date.getUTCHours() + timeZoneOffsetHours);
  
      const today = new Date();
      today.setUTCHours(today.getUTCHours() + timeZoneOffsetHours);
  
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = months[date.getUTCMonth()];
      const day = date.getUTCDate();
      let hour = date.getUTCHours();
      const minute = date.getUTCMinutes();
      const amPm = hour >= 12 ? 'PM' : 'AM';
  
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
  
      const daySuffix = ["th", "st", "nd", "rd"][
          (day % 10 > 3) ? 0 : (((day % 100) - (day % 10) != 10) ? day % 10 : 0)
      ];
  
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
  
      // Check if the date is today
      if (
          date.getUTCFullYear() === today.getUTCFullYear() &&
          date.getUTCMonth() === today.getUTCMonth() &&
          date.getUTCDate() === today.getUTCDate()
      ) {
          return `today at ${hour}:${formattedMinute} ${amPm}`;
      }
  
      return `${dayOfWeek}, ${month} ${day}${daySuffix} at ${hour}:${formattedMinute} ${amPm}`;
  }
  static getDateTimeStartDate(dateTime: any) {
    const hasStartDate = (dateTime.startDateTime != undefined) ? dateTime.startDateTime : undefined;
    return hasStartDate;
  }

  static getDateTimeDate(dateTime: any): {year: string, month: string, day: string}|undefined {
    if (dateTime.day == undefined) {
      return undefined;
    }

    const year = dateTime.year;
    const month = dateTime.month >= 10 ? `${dateTime.month}` : `0${dateTime.month}`
    const day = dateTime.day >= 10 ? `${dateTime.day}` : `0${dateTime.day}`
    return {
      year: year,
      month: month,
      day: day,
    }
  }

  static getDateTimeTime(dateTime: any): {hours: string, minutes: string, seconds: string}|undefined {
    if (dateTime.hours == undefined) {
      return undefined;
    }

    const hours = dateTime.hours;
    const minutes = dateTime.minutes >= 10 ? `${dateTime.minutes}` : `0${dateTime.minutes}`
    const seconds = dateTime.seconds >= 10 ? `${dateTime.seconds}` : `0${dateTime.seconds}`
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }

  static getDateTimeString(dateTime: any, now: Date = new Date()): string {
      const date = Utils.getDateTimeDate(dateTime);
      const time = Utils.getDateTimeTime(dateTime);

      let dateString = '';

      if (date != undefined && time != undefined) {
          dateString = `${date.year}-${date.month}-${date.day} ${time.hours}:${time.minutes}:${time.seconds}`;
      } else if (date != undefined && time == undefined) {
          dateString = `${date.year}-${date.month}-${date.day} 00:00:00`;
      } else if (date == undefined && time != undefined) {
          const month = now.getMonth() >= 10 ? `${now.getMonth()+1}` : `0${now.getMonth()+1}`;
          const day = now.getDate() >= 10 ? `${now.getDate()}` : `0${now.getDate()}`;
          dateString = `${now.getFullYear()}-${month}-${day} ${time.hours}:${time.minutes}:${time.seconds}`;
      } else {
          throw new Error('dateTime is invalid');
      }

      return dateString;
  }

  static formatToISOString(date: Date): string {
    return date.toISOString().replace(/\.\d{3}/, ''); // Removes milliseconds
  }

  static parseDateTime(inputDate: any, timeZoneOffsetHours: number = 5): [string,string] {
    const startDateTime = Utils.getDateTimeStartDate(inputDate);
    const date = Utils.getDateTimeDate(inputDate);
    const time = Utils.getDateTimeTime(inputDate);
    const now = new Date();

    let dateString = '';
    let startTimeString = '';
    let endTimeString = '';

    if (startDateTime != undefined) {
        startTimeString = Utils.getDateTimeString(startDateTime);
        endTimeString = Utils.getDateTimeString(inputDate.endDateTime);

        const startTime = new Date(Date.parse(startTimeString));
        startTime.setHours(startTime.getHours()+timeZoneOffsetHours);
        const endTime = new Date(Date.parse(endTimeString));
        endTime.setHours(endTime.getHours()+timeZoneOffsetHours);
    
        const start_time = Utils.formatToISOString(startTime).replace(/Z/, '.000Z');
        const end_time = Utils.formatToISOString(endTime).replace(/Z/, '.000Z');

        return [start_time, end_time];
    } else if (date != undefined && time != undefined) {
        dateString = `${date.year}-${date.month}-${date.day} ${time.hours}:${time.minutes}:${time.seconds}`;
    } else if (date != undefined && time == undefined) {
        dateString = `${date.year}-${date.month}-${date.day} 07:00:00`;
    } else if (date == undefined && time != undefined) {
      const month = now.getMonth() >= 10 ? `${now.getMonth()+1}` : `0${now.getMonth()+1}`;
      const day = now.getDate() >= 10 ? `${now.getDate()}` : `0${now.getDate()}`;
      dateString = `${now.getFullYear()}-${month}-${day} ${time.hours}:${time.minutes}:${time.seconds}`;
    } else {
        throw new Error('dateTime is invalid');
    }

    console.log(`dateString: ${dateString}`);

    const startTime = new Date(Date.parse(dateString));
    startTime.setHours(startTime.getHours()+timeZoneOffsetHours);
    const endTime = new Date(startTime.getTime() + 7200 * 60000);
    endTime.setHours(endTime.getHours()+timeZoneOffsetHours);

    console.log(`startTime: ${startTime}`);
    console.log(`endTime: ${endTime}`);

    const start_time = Utils.formatToISOString(startTime).replace(/Z/, '.000Z');
    const end_time = Utils.formatToISOString(endTime).replace(/Z/, '.000Z');

    return [start_time, end_time];
  }

  static getRoundedTimeDown(date: Date): Date {
      const minutes = date.getMinutes();
      const roundedMinutes = minutes - (minutes % 30);
      date.setMinutes(roundedMinutes, 0, 0); // Resets seconds and milliseconds to 0
      return date;
  }

  static getRoundedTimeUp(date: Date): Date {
      const minutes = date.getMinutes();

      if (minutes < 30) {
        date.setMinutes(30, 0, 0);
      } else {
        const hour = date.getHours();
        date.setHours(hour+1, 0, 0, 0);
      }

      return date;
  }
}