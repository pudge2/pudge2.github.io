let seedCount = 5;
const plots = document.getElementById("plots");
const seedCounter = document.getElementById("seedCount");

const states = {
    EMPTY: "empty.png",
    SEED: "seed.png",
    GROWING: "growing.png",
    READY: "ready.png"
};

let garden = Array(9).fill(states.EMPTY);

function updateGarden() {
    plots.innerHTML = "";
    garden.forEach((state, index) => {
        const plot = document.createElement("div");
        plot.classList.add("plot");
        plot.style.backgroundImage = `url(${state})`;
        plot.onclick = () => handlePlotClick(index);
        plots.appendChild(plot);
    });
}

function handlePlotClick(index) {
    if (garden[index] === states.EMPTY && seedCount > 0) {
        garden[index] = states.SEED;
        seedCount--;
    } else if (garden[index] === states.READY) {
        garden[index] = states.EMPTY;
        seedCount += 2; // Урожай дает +2 семени
    }
    updateGarden();
    seedCounter.textContent = `x${seedCount}`;
}

document.getElementById("waterButton").addEventListener("click", () => {
    garden = garden.map(state => (state === states.SEED ? states.GROWING : state));
    updateGarden();
    setTimeout(() => {
        garden = garden.map(state => (state === states.GROWING ? states.READY : state));
        updateGarden();
    }, 2000);
});

updateGarden();
