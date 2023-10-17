const days = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];
const weekDay = (data) => {
  const weekIndex = new Date(data * 1000).getDay();
  return days[weekIndex];
};

export { weekDay };
