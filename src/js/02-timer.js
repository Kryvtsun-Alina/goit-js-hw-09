import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require('flatpickr/dist/themes/dark.css');

const refs = {
    startBtnEl: document.querySelector('[data-start]'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
    timerEl: document.querySelector(".timer"),
    fieldsEl: document.querySelectorAll('.field')
}
let intervalId = null;
refs.startBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       const selectedDate = selectedDates[0];
       if (selectedDate <= new Date()) {
        window.alert("Please choose a date in the future");
        refs.startBtnEl.disabled = true;
        return;
       }
    },
  };
const flatpickrInstance = flatpickr("#datetime-picker", options);