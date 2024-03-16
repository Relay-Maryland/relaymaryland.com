/**
 * Return true if a date is more than 30 days in the past from now
 * @param {Date} date - The date to compare to now
 * @param {number} maxAge - The maximum age in days
 * @returns {boolean}
 */
function filterByDays(date, maxAge = 30) {
  const DAY = 1000 * 60 * 60 * 24;
  const now = new Date();

  // Work around timezone issues where Astro's js `Date` is UTC 0 but local machine
  // is UTC -4 so the output of Date methods is the day prior to intended date.
  const _date = new Date(date.toISOString().split('T')[0]);

  const diff = now.getTime() - _date.getTime();

  const diffDays = Math.ceil(diff / DAY);

  return diffDays > maxAge;
}

/**
 * Take a date from markdown frontmatter as 'YYYY-MM-DD' and return
 * a new Date object that is ensured (🤞) to be in the Relay time zone.
 * This is a workaround for Astro's js `Date` being UTC yet the
 * local machine env is different for local dev or hosted server (eg, -4)
 * so the output of Date methods without this function can be the day
 * prior to the intended date.
 *
 * @param {Date} frontmatterDate - The Date object generated from the
 * markdown frontmatter string, eg, `date: 2024-03-14`
 * @returns {Date} - The new Date object with Relay's time zone
 */
function relayDate(frontmatterDate) {
  const ymd = frontmatterDate.toISOString().split('T')[0];

  return new Date(`${ymd}T00:00:00-0${utcOffset()}:00`);
}

/**
 * Returns the short name of the month from the given date.
 *
 * @param {Date} date - The date from which to extract the short month name.
 * @return {string} The short name of the month, eg, 'Mar'.
 */
function shortMonthName(date) {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
  const parts = formatter.formatToParts(date);
  const monthName = parts.find((part) => part.type === 'month').value;
  return monthName;
}

/**
 * @private
 * @returns {number} - Relay's current UTC offset as a positive number
 */
function utcOffset() {
  const now = new Date();
  const options = { timeZone: 'America/New_York', timeZoneName: 'short' };
  const utcOffset = new Intl.DateTimeFormat('en-US', options)
    .formatToParts(now)
    .find((part) => {
      return part.type === 'timeZoneName';
    }).value;

  return utcOffset === 'EDT' ? 4 : 5;
}

function logout(data) {
  console.log('DATA!', data);
}

export { filterByDays, relayDate, shortMonthName, logout };
