let seedCount = 5;
const plots = document.getElementById("plots");
const seedCounter = document.getElementById("seedCount");
const inventory = document.getElementById("inventory");

const states = {
    EMPTY: "empty.png",
    SEED: "seed.png",
    GROWING: "growing.png",
    READY: "ready.png"
};

let garden = Array(9).fill({ state: states.EMPTY, timer: 0 });

function updateGarden() {
    plots.innerHTML = "";
    garden.forEach((plotData, index) => {
        const plot = document.createElement("div");
        plot.classList.add("plot");
        plot.style.backgroundImage = `url(${plotData.state})`;
        plot.onclick = () => handlePlotClick(index);

        if (plotData.state === states.GROWING) {
            plot.onmouseover = () => showTimer(plot, plotData.timer);
            plot.onmouseleave = () => hideTimer(plot);
        }

        plots.appendChild(plot);
    });
}

function showTimer(plot, timeLeft) {
    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    timerElement.textContent = `${timeLeft}s`;
    plot.appendChild(timerElement);
}

function hideTimer(plot) {
    const timerElement = plot.querySelector(".timer");
    if (timerElement) {
        plot.removeChild(timerElement);
    }
}

function handlePlotClick(index) {
    if (garden[index].state === states.EMPTY && seedCount > 0) {
        garden[index] = { state: states.SEED, timer: 0 };
        seedCount--;
    } else if (garden[index].state === states.READY) {
        garden[index] = { state: states.EMPTY, timer: 0 };
        seedCount += 2; // Урожай дает +2 семени
    }
    updateGarden();
    updateInventory();
}

document.getElementById("waterButton").addEventListener("click", () => {
    garden.forEach((plot, index) => {
        if (plot.state === states.SEED) {
            garden[index] = { state: states.GROWING, timer: 20 };
            startGrowth(index);
        }
    });
    updateGarden();
});

function startGrowth(index) {
    let interval = setInterval(() => {
        if (garden[index].timer > 0) {
            garden[index].timer--;
            updateGarden();
        } else {
            garden[index].state = states.READY;
            clearInterval(interval);
            updateGarden();
        }
    }, 1000);
}

function updateInventory() {
    seedCounter.textContent = `x${seedCount}`;
}

updateGarden();
updateInventory();
