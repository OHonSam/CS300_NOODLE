export const formatISODateTimeToSpecificTimezone = (date, timezone) => {
  const d = new Date(date);
  d.setTime(d.getTime() + (timezone * 60 * 60 * 1000));
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  const seconds = String(d.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const getCurrentDateTimeString = () => {
  return formatISODateTimeToSpecificTimezone(new Date().toISOString(), 7);
}
