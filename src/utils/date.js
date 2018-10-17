/* formatDateString returns the MM/DD/YYYY format of a JS date string of milliseconds */
export function formatDateString(date) {
  const dateObject = new Date(date);
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const year = dateObject.getFullYear().toString().substr(-2);
  const dateString = `${month}/${day}/${year}`;
  return dateString;
}

export function checkDateFormat(dateString) {
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{2}$/;

  return dateRegex.test(dateString);
}
