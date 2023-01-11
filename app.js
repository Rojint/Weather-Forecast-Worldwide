let now = new Date();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let monthNames = months[now.getMonth()];
let monthNumbers = now.getMonth();

let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayNames[now.getDay()];

let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();
let dayNumber = now.getDate();
let time = now.toString().substr(16, 5);

let currentDate = `${day}, ${monthNames} ${dayNumber} </br> ${time}`;
console.log(currentDate);

let dateBox = document.querySelector("#date");
dateBox.innerHTML = currentDate;
