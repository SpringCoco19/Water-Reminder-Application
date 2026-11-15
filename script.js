
const homeScreen = document.getElementById("homeScreen");
const timerScreen = document.getElementById("timerScreen");

// GET THE BUTTONS
const openTimer = document.getElementById("openTimer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

// SWITCH TO TIMER SCREEN
openTimer.addEventListener("click", function() {
    homeScreen.style.display = "none";
    timerScreen.style.display = "block";
});

// TIMER SETTINGS
const timer = document.getElementById("timer");

let timeLeft = 30 * 60;
let interval = null;

// UPDATE TIMER DISPLAY
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

// START COUNTDOWN
startButton.addEventListener("click", function() {

    if (interval !== null) return;

    interval = setInterval(function() {

        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(interval);
            interval = null;
            alert("Time to drink water! 💧");
        }

    }, 1000);

});

// RESET TIMER
resetButton.addEventListener("click", function() {

    clearInterval(interval);
    interval = null;

    timeLeft = 30 * 60;
    updateTimer();

});

updateTimer();

