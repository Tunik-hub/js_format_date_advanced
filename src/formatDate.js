'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const dateObj = {};

  fromFormat.slice(0, -1).forEach((format, index) => {
    dateObj[format] = dateParts[index];
  });

  let year = dateObj['YYYY'] || dateObj['YY'];
  const month = dateObj['MM'];
  const day = dateObj['DD'];

  if (year) {
    if (year.length === 4 && toFormat.includes('YY')) {
      year = year.slice(-2);
    } else if (year.length === 2) {
      if (toFormat.includes('YYYY') && year < 30) {
        year = '20' + year;
      } else if (toFormat.includes('YYYY')) {
        year = '19' + year;
      }
    }
  }

  const formattedDate = toFormat.slice(0, -1).map(format => {
    if (format === 'MM') {
      return month;
    } else if (format === 'YYYY' || format === 'YY') {
      return year;
    } else if (format === 'DD') {
      return day;
    }
  }).join(toFormat[toFormat.length - 1]);

  return formattedDate;
}

module.exports = formatDate;
