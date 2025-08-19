// prettier-ignore
export type Second = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19'
  | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29'
  | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39'
  | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49'
  | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | string;

export type Minute = Second

// prettier-ignore
export type Hour = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20'
  | '21' | '22' | '23' | string;

// prettier-ignore
export type Day =
| '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09'
| '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19'
| '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29'
| '30' | '31' | string;

// prettier-ignore
export type Week = '1' | '2' | '3' | '4' | '5' | string;

// prettier-ignore
export type DayOfWeek = '0' | '1' | '2' | '3' | '4' | '5' | '6' | string;

// prettier-ignore
export type Month = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | string;

// prettier-ignore
export type Year =
  | '2020' | '2021' | '2022' | '2023' | '2024' | '2025' | '2026' | '2027' | '2028' | '2029'
  | '2030' | '2031' | '2032' | '2033' | '2034' | '2035' | '2036' | '2037' | '2038' | '2039' | '2040' | string;

export type ClockMode = '0' | '1' | '2' | string // '0': Local Time, '1': NTP, '2': Cloud Sync Time

// Daylight Saving Time offset in minutes relative to UTC
export type DaylightSavingOffset =
  | '-120' // -2:00
  | '-90' // -1:30
  | '-60' // -1:00
  | '-30' // -0:30
  | '30' // +0:30
  | '60' // +1:00
  | '90' // +1:30
  | '120' // +2:00
  | string

export type ConsoleLogLevel =
  | '8' // Debug
  | '7' // Info
  | '6' // Notice
  | '5' // Warning
  | '4' // Error
  | '3' // Critical
  | '2' // Alert
  | '1' // Emergency
  | string

export type CronLogLevel =
  | '5' // Debug
  | '8' // Normal
  | '9' // Warning
  | string

export type RestoreResult =
  | '-1' // Running or unavailable to get result
  | '0' // Success
  | '1' // ERROR_MAGIC_NUMBER
  | '2' // ERROR_BOARD_ID
  | '3' // ERROR_CHECKSUM
  | '4' // ERROR_DECRYPT_FAIL
  | '5' // ERROR_FILE_TOO_LARGE
  | '6' // ERROR_WRITE_FILE_FAIL
  | '7' // ERROR_IMAGE_SUPPORT
  | string
