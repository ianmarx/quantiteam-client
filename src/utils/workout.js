export default function timeStringToSeconds(timeString) {
  const hms = timeString;
  const array = hms.split(':');
  const a = array.map(Number);
  if (a.length === 1) {
    return parseFloat(a[0], 10).toPrecision(3) * 1;
  }
  if (a.length === 2) {
    return (a[0] * 60) + (parseFloat(a[1], 10).toPrecision(3) * 1);
  }
  if (a.length === 3) {
    return (a[0] * 60 * 60) + (a[1] * 60) + (parseFloat(a[2], 10).toPrecision(3) * 1);
  }
  return null;
}
