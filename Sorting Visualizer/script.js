let array = [];
let speed = 1000;

// Generate Bars for Visualization
function generateBars(arr) {
    const bars = document.getElementById("bars");
    bars.innerHTML = ""; // Clear existing bars
    const maxVal = Math.max(...arr); 
    const maxHeight = 190; 

    
    const limitedArray = arr.slice(0, 8);

    limitedArray.forEach(value => {
        const barContainer = document.createElement("div");
        const bar = document.createElement("div");
        const barLabel = document.createElement("div");

        barContainer.classList.add("bar-container");
        bar.classList.add("bar");
        barLabel.classList.add("bar-label");

        // Adjust bar height dynamically based on max value
        const barHeight = (value / maxVal) * maxHeight;

        bar.style.height = `${barHeight}px`;
        bar.style.width = "30px";
        barLabel.textContent = value;

        barContainer.appendChild(bar);
        barContainer.appendChild(barLabel);
        bars.appendChild(barContainer);
    });
}


async function bubbleSort(arr) {
    const bars = document.querySelectorAll(".bar");
    const barLabels = document.querySelectorAll(".bar-label");

    let swapCount = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1; j++) { 
            bars[j].classList.add("highlight");
            bars[j + 1].classList.add("highlight");

            if (arr[j] > arr[j + 1]) {
                
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapCount++; 

                // Update the bars and labels after swap
                const maxVal = Math.max(...arr);
                bars[j].style.height = `${(arr[j] / maxVal) * 190}px`;
                bars[j + 1].style.height = `${(arr[j + 1] / maxVal) * 190}px`;

                barLabels[j].textContent = arr[j];
                barLabels[j + 1].textContent = arr[j + 1];
            }

            // Wait for visualization speed
            await new Promise(resolve => setTimeout(resolve, speed));

            // Remove highlight after comparison
            bars[j].classList.remove("highlight");
            bars[j + 1].classList.remove("highlight");
        }
    }

    // Display sorted message and swap count
    setTimeout(() => {
        alert(`Array is sorted! Total swaps: ${swapCount}`);
    }, 500);
}

// Handle Start Visualization
document.getElementById("start-button").addEventListener("click", () => {
    const input = document.getElementById("array-input").value.trim();
    if (!input) {
        alert("Please enter an array of numbers.");
        return;
    }

    // Parse input and handle invalid values
    array = input.split(",").map(value => {
        const num = Number(value.trim());
        if (isNaN(num)) {
            alert("Invalid input. Please enter only numbers separated by commas.");
            throw new Error("Invalid input detected.");
        }
        return num;
    });

   
    if (array.length > 8) {
        alert("Please enter no more than 8 numbers.");
        return;
    }

   
    speed = Number(document.getElementById("speed").value);
    if (isNaN(speed) || speed <= 0) {
        alert("Please enter a valid speed (positive number).");
        return;
    }

    generateBars(array);

    setTimeout(() => {
        const algorithm = document.getElementById("algorithm").value;
        if (algorithm === "bubble") {
            bubbleSort(array);
        } else {
            alert("Algorithm not implemented yet.");
        }
    }, 1000); // Delay to display bars before starting visualization
});
