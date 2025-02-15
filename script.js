let seedCount = 5;
let waterCount = 3;
let harvestCount = 0;
let selectedItem = null;

const plots = document.getElementById("plots");
const seedCounter = document.getElementById("seedCount");
const waterCounter = document.getElementById("waterCount");
const harvestCounter = document.getElementById("harvestCount");
const toggleInventoryButton = document.getElementById("toggleInventory");
const closeInventoryButton = document.getElementById("closeInventory");
const inventory = document.getElementById("inventory");
const selectedItemText = document.getElementById("selectedItem");

const states = {
    EMPTY: "empty.png",
    SEED: "seed.png",
    GROWING: "growing.png",
    READY: "ready.png"
};

let garden = Array(9).fill(states.EMPTY);
let growthTimers = Array(9).fill(null);

function updateGarden() {
    plots.innerHTML = "";
    garden.forEach((state, index) => {
        const plot = document.createElement("div");
        plot.classList.add("plot");
        plot.style.backgroundImage = `url(${states.EMPTY})`;

        if (state !== states.EMPTY) {
            const plant = document.createElement("div");
            plant.classList.add("plant");
            plant.style.backgroundImage = `url(${state})`;
            plot.appendChild(plant);
        }

        plot.onclick = () => handlePlotClick(index);
        plots.appendChild(plot);
    });
}

function handlePlotClick(index) {
    if (selectedItem === "seed" && garden[index] === states.EMPTY && seedCount > 0) {
        garden[index] = states.SEED;
        seedCount--;
        seedCounter.textContent = `x${seedCount}`;
    } else if (selectedItem === "water" && garden[index] === states.SEED && waterCount > 0) {
        garden[index] = states.GROWING;
        waterCount--;
        waterCounter.textContent = `x${waterCount}`;

        setTimeout(() => {
            garden[index] = states.READY;
            updateGarden();
        }, 8000);
    } else if (garden[index] === states.READY) {
        garden[index] = states.EMPTY;
        seedCount += 2;
        harvestCount++;
        waterCount += 1.5;
        harvestCounter.textContent = `x${harvestCount}`;
        waterCounter.textContent = `x${Math.floor(waterCount)}`;
    }
    updateGarden();
}

toggleInventoryButton.addEventListener("click", () => {
    inventory.style.display = inventory.style.display === "none" ? "block" : "none";
});

closeInventoryButton.addEventListener("click", () => {
    inventory.style.display = "none";
});

function selectItem(item) {
    selectedItem = item;
    selectedItemText.textContent = item === "seed" ? "Семена" : item === "water" ? "Вода" : "Урожай";

    document.querySelectorAll(".inventory-item").forEach(el => el.classList.remove("selected"));
    document.querySelector(`[data-item="${item}"]`).classList.add("selected");
}

document.getElementById("seedItem").addEventListener("click", () => selectItem("seed"));
document.getElementById("waterItem").addEventListener("click", () => selectItem("water"));

updateGarden();
