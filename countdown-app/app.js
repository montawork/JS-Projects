// select from DOM
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const mins = document.getElementById('mins');
const secs = document.getElementById('secs');
const countdownSection = document.querySelector('.countdown-section');
let tickTock;
// add zero if the number less then 10
const addZero = (n) => (n < 10 ? `0${n}` : n);

function countDown() {
  // rest time in mellisecondes
  const restTime = new Date('5 feb 2022 16:08') - new Date();

  let tick = new Audio('./countdown.wav');
  if (restTime > 0) {
    // background music
    tick.play();

    // const restDays = Math.floor(restTime / 1000 / 3600 / 24);
    // const restHours = Math.floor(restTime / 1000 / 3600 - restDays * 24);
    // const restMins = Math.floor(
    //   restTime / 1000 / 60 - restDays * 24 * 60 - restHours * 60
    // );
    // const restSecs = Math.floor(
    //   restTime / 1000 - restDays * 24 * 3600 - restHours * 3600 - restMins * 60
    // );

    const restDays = Math.floor(restTime / 1000 / 3600 / 24);
    const restHours = Math.floor(restTime / 1000 / 3600) % 24;
    const restMins = Math.floor(restTime / 1000 / 60) % 60;
    const restSecs = Math.floor(restTime / 1000) % 60;

    days.textContent = addZero(restDays);
    hours.textContent = addZero(restHours);
    mins.textContent = addZero(restMins);
    secs.textContent = addZero(restSecs);
  } else {
    tick.pause();
    tick.currentTime = 0;
    countdownSection.textContent = 'End';
  }
}

setInterval(() => countDown(), 1000);
