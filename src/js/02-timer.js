import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker')
const start = document.querySelector('[data-start]')
const days = document.querySelector('[data-days]')
const hours = document.querySelector('[data-hours]')
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]')

let selectedDate = null
let intervalId = null


const fp = flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.dir(selectedDates[0]);
        selectedDate = selectedDates[0];
        validateChoice(selectedDate)
        
    }
});
start.disabled = true;

function validateChoice(currentDate) {
    if (currentDate < new Date()) {
        Notiflix.Notify.warning("Please choose a date in the future")
    }
    else { start.disabled = false; }
}


function timer() {
    start.disabled = true;
    intervalId =
        setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = selectedDate - currentTime
            const convertDate = convertMs(deltaTime)
            console.log(convertDate)

            days.textContent = addLeadingZero(convertDate.days)
            hours.textContent = addLeadingZero(convertDate.hours)
            minutes.textContent = addLeadingZero(convertDate.minutes)
            seconds.textContent = addLeadingZero(convertDate.seconds)

            if (deltaTime < 1000) {
        clearInterval(intervalId)
    }
        }, 1000);
    
    

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
   return String(value).padStart(2, '0')
}

start.addEventListener('click', timer)