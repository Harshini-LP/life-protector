// voice.js

// Variables to keep track of clicks and speech states
let sosClickCount = 0;
let sosClickTimeout = null;
let emergencySpeech = null;
let isVoiceActive = false;

/**
 * Tracks and requires exactly 3 rapid clicks within 2 seconds to trigger the alarm
 */
function handleSosClick() {
    sosClickCount++;

    // Clear previous timeout on every new click to reset the window
    if (sosClickTimeout) {
        clearTimeout(sosClickTimeout);
    }

    // Check if the user successfully hit 3 clicks
    if (sosClickCount === 3) {
        sosClickCount = 0; // Reset counter
        triggerEmergency();
    } else {
        // If the user stops clicking, reset the count back to 0 after 2 seconds
        sosClickTimeout = setTimeout(() => {
            sosClickCount = 0;
        }, 2000);
    }
}

/**
 * Initiates the loop sequence safely
 */
function triggerEmergency() {
    if (isVoiceActive) return; // Prevent multiple voice loops from stacking up
    isVoiceActive = true;
    playVoiceGuide();
}

/**
 * Loops the "Emergency please help me" message offline natively
 */
function playVoiceGuide() {
    if (!isVoiceActive) return;

    // The precise text string you requested
    emergencySpeech = new SpeechSynthesisUtterance("Emergency, please help me.");
    
    // Voice configuration optimized for urgency
    emergencySpeech.rate = 1.0;  
    emergencySpeech.pitch = 1.1; 
    emergencySpeech.volume = 1.0; 

    // When the phrase finishes speaking, loop it back immediately
    emergencySpeech.onend = function() {
        if (isVoiceActive) {
            setTimeout(playVoiceGuide, 500); // 0.5-second break before repeating
        }
    };

    emergencySpeech.onerror = function(event) {
        console.error("Speech error:", event.error);
    };

    // Execute speech audio output natively
    window.speechSynthesis.speak(emergencySpeech);
}

/**
 * Shuts off the speech loops and kills all active voice synthesis instantly
 */
function stopEmergencyVoice() {
    isVoiceActive = false;
    sosClickCount = 0; // Reset the click tracker

    if (window.speechSynthesis) {
        window.speechSynthesis.cancel(); // Clears system audio queue instantly
    }
    console.log("Emergency loop stopped.");
}
