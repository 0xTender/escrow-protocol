function numberEnding(number: number) {
  return number > 1 ? "s" : "";
}

export function secondsToString(seconds: number) {
  const y = Math.floor(seconds / 31536000);
  const d = Math.floor((seconds % 31536000) / 86400);
  const hh = Math.floor(((seconds % 31536000) % 86400) / 3600);
  const mm = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  const ss = ((((seconds % 31536000) % 86400) % 3600) % 60).toFixed(0);
  return (
    (y > 0 ? y.toString() + " years " : "") +
    (d > 0 ? d.toString() + " days " : "") +
    (hh > 0 ? hh.toString() + " hours " : "") +
    mm.toString() +
    " minutes " +
    ss.toString() +
    " seconds"
  );
}

export function millisecondsToStr(milliseconds: number) {
  let temp = Math.floor(milliseconds / 1000);
  const years = Math.floor(temp / 31536000);
  if (years) {
    return years.toString() + " year" + numberEnding(years);
  }

  const days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return days.toString() + " day" + numberEnding(days);
  }
  const hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours.toString() + " hour" + numberEnding(hours);
  }
  const minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes.toString() + " minute" + numberEnding(minutes);
  }
  const seconds = temp % 60;
  if (seconds) {
    return seconds.toString() + " second" + numberEnding(seconds);
  }
  return "less than a second"; //'just now' //or other string you like;
}
