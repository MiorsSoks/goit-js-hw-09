const start = document.querySelector('[data-start]')
const stop = document.querySelector('[data-stop]')
const body = document.querySelector('body')

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackground() {
    body.style.backgroundColor = `${getRandomHexColor()}`;
    start.disabled = true;
}
let IntervalId = null
 
const onClickStart = () => {
  IntervalId =  setInterval(changeBackground, 1000)
}
const onClickStop = () => {
    clearInterval(IntervalId)
    start.disabled = false;
}
start.addEventListener('click', onClickStart)
stop.addEventListener('click', onClickStop)
