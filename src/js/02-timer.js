import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";

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

refs.startBtnEl.addEventListener("click", StartTimer);

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
        refs.startBtnEl.disabled = false;
        console.log(selectedDate);
      },
  };
const flatpickrInstance = flatpickr("#datetime-picker", options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  function stopTimer() {
    clearInterval(intervalId);
    refs.startBtnEl.disabled = false;
  }

function StartTimer() {
    const selectedDate = flatpickrInstance.selectedDates[0];
    let timeDiff = selectedDate.getTime() - Date.now();

    if (timeDiff <= 0) {
        window.alert("Please choose a date in the future");
        return;
    }

    refs.startBtnEl.disabled = true;

    intervalId = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(timeDiff);

    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);
    timeDiff -= 1000;

    if (timeDiff < 0) {
        stopTimer();
      }
    }, 1000);
  }
 