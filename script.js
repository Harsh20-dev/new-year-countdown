const config = {
    showCelebration: true,
    pulseLastSeconds: true
};
const currentYear = new Date().getFullYear();
const targetYear = currentYear + 1;
const newYearDate = new Date(`January 1, ${targetYear} 00:00:00`).getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const container = document.querySelector(".container");
const formatTime = (time) => time < 10 ? `0${time}` : time;
function getTimeDifference() {
    const now = new Date().getTime();
    return newYearDate - now;
}

function updateUI(diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.innerText = formatTime(days);
    hoursEl.innerText = formatTime(hours);
    minutesEl.innerText = formatTime(minutes);
    secondsEl.innerText = formatTime(seconds);

    if (config.pulseLastSeconds && days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
        pulseEffect();
    }
}
function pulseEffect() {
    document.querySelectorAll(".box").forEach(box => {
        box.style.transform = "scale(1.08)";
        box.style.boxShadow = "0 0 30px gold";
        setTimeout(() => {
            box.style.transform = "scale(1)";
        }, 300);
    });
}
function celebrate() {
    container.innerHTML = `
        <h1>🎉 Happy New Year ${targetYear}! 🎆</h1>
        <p style="margin-top:15px;font-size:18px;opacity:0.9">
            New beginnings • New goals • New energy 🚀
        </p>
    `;
}
function startCountdown() {
    const diff = getTimeDifference();

    if (diff <= 0) {
        clearInterval(timer);
        if (config.showCelebration) celebrate();
        return;
    }

    updateUI(diff);
}
const timer = setInterval(startCountdown, 1000);
startCountdown();
