
const homeScreen = document.getElementById("homeScreen");
const timerScreen = document.getElementById("timerScreen");

const openTimer = document.getElementById("openTimer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

const timer = document.getElementById("timer");
const timerSound = document.getElementById("timerSound");

// GIF ELEMENTS
const workingCat = document.getElementById("workingCat");
const breakCat = document.getElementById("breakCat");

// TIMER SETTINGS (in seconds)
// These are short test times. You can change them later!
const WORK_TIME = 10;
const BREAK_TIME = 10;

// TIMER VARIABLES
let timeLeft = WORK_TIME;
let interval = null;
let currentMode = "work";

// OPEN TIMER SCREEN
openTimer.addEventListener("click", function() {
    homeScreen.style.display = "none";
    timerScreen.style.display = "block";
});

// CHANGE GIF
function updateCat() {
    if (currentMode === "work") {
        workingCat.style.display = "block";
        breakCat.style.display = "none";
    } else {
        workingCat.style.display = "none";
        breakCat.style.display = "block";
    }
}

// UPDATE TIMER DISPLAY
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

// PLAY SOUND AND SHOW NOTIFICATION
function notifyUser() {
    timerSound.loop = true;
    timerSound.currentTime = 0;

    timerSound.play().catch(function(error) {
        console.log("Sound could not play:", error);
    });

    window.electronAPI.showNotification();
}

// SWITCH BETWEEN WORK AND BREAK
function switchMode() {
    clearInterval(interval);
    interval = null;

    if (currentMode === "work") {
        currentMode = "break";
        timeLeft = BREAK_TIME;
    } else {
        currentMode = "work";
        timeLeft = WORK_TIME;
    }

    updateCat();
    updateTimer();
    notifyUser();
}

// START COUNTDOWN
startButton.addEventListener("click", function() {
    if (interval !== null) return;

    // Show the working cat when Start is clicked
    currentMode = "work";
    updateCat();

    interval = setInterval(function() {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            switchMode();
        }
    }, 1000);
});

// STOP SOUND WHEN NOTIFICATION IS DISMISSED
window.electronAPI.onStopSound(function() {
    timerSound.pause();
    timerSound.currentTime = 0;
    timerSound.loop = false;
});

// RESET TIMER
resetButton.addEventListener("click", function() {
    clearInterval(interval);
    interval = null;

    timerSound.pause();
    timerSound.currentTime = 0;
    timerSound.loop = false;

    currentMode = "work";
    timeLeft = WORK_TIME;

    updateCat();
    updateTimer();
});

// INITIAL DISPLAY
updateCat();
updateTimer();


