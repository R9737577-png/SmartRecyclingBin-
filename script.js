
const checkButton = document.getElementById("checkStatusBtn");
const statusText = document.getElementById("esp32Status");
const message = document.getElementById("statusMessage");

const ESP32_URL = "http://192.168.1.100/status";

checkButton.addEventListener("click", async function () {

    statusText.textContent = "Checking...";
    message.textContent = "Connecting to ESP32...";
    checkButton.disabled = true;

    try {
        const response = await fetch(ESP32_URL);

        if (!response.ok) {
            throw new Error("Connection failed");
        }

        const data = await response.json();

        if (data.connected === true) {
            statusText.textContent = "Connected";
            message.textContent = "ESP32 is working successfully!";
        } else {
            statusText.textContent = "Not Connected";
            message.textContent = "Device is offline.";
        }

    } catch (error) {
        statusText.textContent = "Not Connected";
        message.textContent = "Unable to connect to ESP32.";

    } finally {
        checkButton.disabled = false;
    }
});
