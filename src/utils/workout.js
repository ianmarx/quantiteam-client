export default function timeStringToSeconds(timeString) {
  /* reject empty strings */
  if (timeString === '') {
    return NaN;
  }

  /* parse input */
  const hms = timeString;
  const array = hms.split(':');
  const a = array.map(Number);

  /* validate input */
  if (a.length === 1) {
    return parseFloat(a[0], 10).toPrecision(3) * 1;
  } else if (a.length === 2) {
    return (a[0] * 60) + (parseFloat(a[1], 10).toPrecision(3) * 1);
  } else if (a.length === 3) {
    return (a[0] * 60 * 60) + (a[1] * 60) + (parseFloat(a[2], 10).toPrecision(3) * 1);
  } else {
    return NaN;
  }
}
