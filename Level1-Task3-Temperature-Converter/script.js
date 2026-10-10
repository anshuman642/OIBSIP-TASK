
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");

const errorMessage = document.getElementById("errorMessage");
const results = document.getElementById("results");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

const resetButton = document.getElementById("resetButton");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const temperature = temperatureInput.valueAsNumber;
    const unit = fromUnit.value;

    errorMessage.textContent = "";
    results.hidden = true;

    // Validate numeric input
    if (temperatureInput.value.trim() === "" ||
        !Number.isFinite(temperature)) {
        showError("Please enter a valid numeric temperature.");
        return;
    }

    // Convert the entered temperature to Celsius first
    let celsius;

    if (unit === "C") {
        celsius = temperature;
    } else if (unit === "F") {
        celsius = (temperature - 32) * 5 / 9;
    } else {
        celsius = temperature - 273.15;
    }

    // Reject temperatures below absolute zero
    if (celsius < -273.15) {
        showError(
            "Temperature cannot be below absolute zero (-273.15 °C)."
        );
        return;
    }

    // Convert Celsius to all other units
    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    celsiusResult.textContent = `${format(celsius)} °C`;
    fahrenheitResult.textContent = `${format(fahrenheit)} °F`;
    kelvinResult.textContent = `${format(kelvin)} K`;

    results.hidden = false;
});

function format(value) {
    // Avoid showing -0 due to floating-point rounding
    if (Math.abs(value) < 0.0000001) {
        value = 0;
    }

    return Number(value.toFixed(2)).toString();
}

function showError(message) {
    errorMessage.textContent = message;
}

resetButton.addEventListener("click", function () {
    form.reset();

    errorMessage.textContent = "";
    results.hidden = true;

    temperatureInput.focus();
});
