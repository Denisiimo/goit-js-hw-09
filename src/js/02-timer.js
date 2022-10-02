import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputRef = document.querySelector("#datetime-picker")
const onStartBtn = document.querySelector("[data-start]")
const daysRef = document.querySelector("[data-days]")
const hoursRef = document.querySelector("[data-hours]")
const minutesRef = document.querySelector("[data-minutes]")
const secondsRef = document.querySelector("[data-seconds]")
onStartBtn.disabled = true

onStartBtn.addEventListener("click", startTimer)

function startTimer() {
    setInterval(() => {
        const startDate = new Date();
        timeDiff = currentTime - startDate;
        if (timeDiff <= 0) {
            // Notiflix.Notify.success('End of time!');
            clearInterval()
            return;
        };
        onStartBtn.disabled = true
        const { days, hours, minutes, seconds } = convertMs(timeDiff);
        daysRef.textContent = days;
        hoursRef.textContent = hours;
        minutesRef.textContent = minutes;
        secondsRef.textContent = seconds;
    }, 1000)
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        currentTime = selectedDates[0];
        console.log(currentTime)
        if (selectedDates[0] < options.defaultDate) {
                Notiflix.Notify.failure("Please choose a date in the future")
            onStartBtn.disabled = true
        }
        else {
            onStartBtn.disabled = false
        }
    },
};

flatpickr(inputRef, options)

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0)
};