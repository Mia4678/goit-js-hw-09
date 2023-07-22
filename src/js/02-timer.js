import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


// Функція для форматування чисел з переданням "0" перед однозначними значеннями
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  
  // Функція для обчислення різниці часу в мілісекундах між двома датами
function getTimeDifference(endDate) {
    const currentTime = new Date().getTime();
    const targetTime = endDate.getTime();
    return Math.max(targetTime - currentTime, 0); // Повертаємо 0, якщо дата в минулому
  }

  function updateTimerDisplay(time) {
    const { days, hours, minutes, seconds } = convertMs(time);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }

  // Функція для обчислення днів, годин, хвилин та секунд з мілісекунд
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

const startButton = document.querySelector('[data-start]');

// Задаємо параметри для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentTime = new Date().getTime();

    if (selectedDate <= currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Ініціалізуємо flatpickr
flatpickr("#datetime-picker", options);

// Додаємо обробник події для кнопки "Start"
startButton.addEventListener('click', () => {
  const selectedDate = new Date(document.querySelector('#datetime-picker').value);
  const intervalId = setInterval(() => {
    const timeDifference = getTimeDifference(selectedDate);

    if (timeDifference === 0) {
      clearInterval(intervalId);
    }

    updateTimerDisplay(timeDifference);
  }, 1000);
});