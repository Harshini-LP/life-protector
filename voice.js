// voice.js

// Variables to keep track of clicks and speech states
let sosClickCount = 0;
let sosClickTimeout = null;
let emergencySpeech = null;
let isVoiceActive = false;

/**
 * Tracks and requires exactly 3 rapid clicks within 2 seconds
 */
function handleSosClick() {
    sosClickCount++;

    if (sosClickTimeout) {
        clearTimeout(sosClickTimeout);
    }

    if (sosClickCount === 3) {
        sosClickCount = 0;
        triggerEmergency();
    } else {
        sosClickTimeout = setTimeout(() => {
            sosClickCount = 0;
        }, 2000);
    }
}

/**
 * Starts the emergency voice loop
 */
function triggerEmergency() {
    if (isVoiceActive) return;

    isVoiceActive = true;

    // Show STOP VOICE button
    const stopButton = document.getElementById("stopButton");
    if (stopButton) {
        stopButton.style.display = "inline-block";
    }

    playVoiceGuide();
}

/**
 * Voice loop: "Please help me"
 */
function playVoiceGuide() {
    if (!isVoiceActive) return;

    emergencySpeech = new SpeechSynthesisUtterance("Please help me.");

    emergencySpeech.rate = 1.0;
    emergencySpeech.pitch = 1.1;
    emergencySpeech.volume = 1.0;

    emergencySpeech.onend = function () {
        if (isVoiceActive) {
            setTimeout(playVoiceGuide, 500);
        }
    };

    emergencySpeech.onerror = function (event) {
        console.error("Speech error:", event.error);
    };

    window.speechSynthesis.speak(emergencySpeech);
}

/**
 * Stops the voice loop
 */
function stopEmergencyVoice() {
    isVoiceActive = false;
    sosClickCount = 0;

    if (sosClickTimeout) {
        clearTimeout(sosClickTimeout);
        sosClickTimeout = null;
    }

    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }

    // Hide STOP VOICE button
    const stopButton = document.getElementById("stopButton");
    if (stopButton) {
        stopButton.style.display = "none";
    }

    console.log("Emergency voice stopped.");
}

/**
 * Called by STOP VOICE button
 */
function stopSOS() {
    stopEmergencyVoice();
}
