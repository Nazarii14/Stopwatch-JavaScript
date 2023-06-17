const startButton = document.getElementsByClassName("btn btn-secondary")[0];
const stopButton = document.getElementsByClassName("btn btn-secondary")[1];
const resetButton = document.getElementsByClassName("btn btn-secondary")[2];

let hoursElement = document.getElementById('hours');
let minutesElement = document.getElementById('minutes');
let secondsElement = document.getElementById('seconds');
let tensElement = document.getElementById('tens');

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;
let tens = 0;

startButton.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10)
    }
})

stopButton.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
})

resetButton.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId)
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hours = 0;
    minutes = 0;
    tens = 0;

    tensElement.innerHTML = "00";
    secondsElement.innerHTML = "00";
    minutesElement.innerHTML = "00";
    hoursElement.innerHTML = "00";
})

function updateTime() {
    elapsedTime = Date.now() - startTime;

    tens = Math.floor(elapsedTime / 10) % 100
    seconds = Math.floor((elapsedTime / 1000) % 60);
    minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    tens = pad(tens)
    seconds = pad(seconds)
    minutes = pad(minutes)
    hours = pad(hours)

    tensElement.innerHTML = tens;
    secondsElement.innerHTML = seconds;
    minutesElement.innerHTML = minutes;
    hoursElement.innerHTML = hours;
    

    function pad(digit) {
        return (("0") + digit).length > 2 ? digit : "0" + digit
    }
}
