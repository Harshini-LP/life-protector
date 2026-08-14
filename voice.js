// voice.js
let emergencySpeech = null;
let isVoiceActive = false;

function triggerEmergency() {
    if (isVoiceActive) return; 
    isVoiceActive = true;
    playVoiceGuide();
}

function playVoiceGuide() {
    if (!isVoiceActive) return;

    emergencySpeech = new SpeechSynthesisUtterance("Please help me. Emergency. Please help me.");
    emergencySpeech.rate = 1.0;  
    emergencySpeech.pitch = 1.1; 
    emergencySpeech.volume = 1.0; 

    emergencySpeech.onend = function() {
        if (isVoiceActive) {
            setTimeout(playVoiceGuide, 1000); 
        }
    };

    emergencySpeech.onerror = function(event) {
        console.error("Speech generation error:", event.error);
    };

    window.speechSynthesis.speak(emergencySpeech);
}

function stopEmergencyVoice() {
    isVoiceActive = false;
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    console.log("Emergency voice guide has been stopped.");
}
