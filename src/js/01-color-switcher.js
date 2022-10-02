const startRef = document.querySelector("[data-start]")
const stopRef = document.querySelector("[data-stop]")
stopRef.disabled = true

startRef.addEventListener("click", onStart);
stopRef.addEventListener("click", onStop);

function onStart() {
    background = setInterval(() => {
        document.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000)
    startRef.disabled = true
    stopRef.disabled = false
}

function onStop() {
    clearInterval(background)
    stopRef.disabled = true
    startRef.disabled = false
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};