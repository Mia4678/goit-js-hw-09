function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');

  let intervalId = 0 ;

  function startColorSwitch() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  function stopColorSwitch() {
    stopBtn.disabled = true;
    startBtn.disabled = false;

    clearInterval(intervalId);
  }

  startBtn.addEventListener('click', startColorSwitch);
  stopBtn.addEventListener('click', stopColorSwitch);