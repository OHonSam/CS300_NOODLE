export const formatISODateTimeToNormalDateTime = (date) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: 'numeric', minute: '2-digit', second: '2-digit',
    hourCycle: 'h24',
    timeZone: 'UTC'
  });
  // const utcOffset = new Date(date).getTimezoneOffset();
  // const sign = utcOffset <= 0 ? '+' : '-';
  // const hours = Math.abs(Math.floor(utcOffset / 60));
  // const minutes = Math.abs(utcOffset % 60);
  // const offsetString = `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  // return formatter.format(new Date(date)) + ' ' + offsetString;
  return formatter.format(new Date(date));
}

export const getCurrentDateTimeString = () => {
  return formatISODateTimeToNormalDateTime(new Date().toISOString());
}
