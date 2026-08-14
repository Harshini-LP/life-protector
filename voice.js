let speechInterval;

function startSOS() {
    window.speechSynthesis.cancel();
    clearInterval(speechInterval);

    const stopButton = document.getElementById("stopButton");
    if (stopButton) {
        stopButton.style.display = "inline-block";
    }

    const textToSpeak = "Help me! Help me!";
    
    // 💡 மாற்றம்: பிரவுசரின் வாய்ஸ் லிஸ்ட் லோடு ஆகும் வரை காத்திருந்து பேசும் பாதுகாப்பு குறியீடு
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = function() {
            speakText(textToSpeak);
        };
    } else {
        speakText(textToSpeak);
    }

    speechInterval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
            speakText(textToSpeak);
        }
    }, 1500); 
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; 
    utterance.rate = 1.1;     
    utterance.volume = 1.0;   
    window.speechSynthesis.speak(utterance);
}

function stopSOS() {
    window.speechSynthesis.cancel();
    clearInterval(speechInterval);
    
    const stopButton = document.getElementById("stopButton");
    if (stopButton) {
        stopButton.style.display = "none";
    }
    
    const actionLog = document.getElementById("actionLog");
    if (actionLog) {
        actionLog.textContent = "System Ready. Emergency cancelled.";
    }
}
