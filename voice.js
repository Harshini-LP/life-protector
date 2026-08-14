let speechInterval;

function startSOS() {
    // 1. முதலில் ஏற்கனவே ஏதாவது பேசிக்கொண்டிருந்தால் அதை நிறுத்தவும்
    window.speechSynthesis.cancel();
    clearInterval(speechInterval);

    // 2. Stop பட்டனைக் காண்பிக்கவும்
    const stopButton = document.getElementById("stopButton");
    if (stopButton) {
        stopButton.style.display = "inline-block";
    }

    const textToSpeak = "Help me! Help me!";
    
    // 3. உடனே பேசச் சொல்லுதல்
    speakText(textToSpeak);

    // 4. 💡 மேம்படுத்தப்பட்ட லூப்: 
    // பிரவுசர் ஏற்கனவே பேசிக்கொண்டிருக்கவில்லை என்றால் மட்டுமே அடுத்த முறை பேசும். 
    // இதனால் குரல் ஒன்றன் மேல் ஒன்று ஓவர்லேப் ஆகாது.
    speechInterval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
            speakText(textToSpeak);
        }
    }, 1500); // 1.5 வினாடிக்கு ஒருமுறை செக் செய்யும்
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; 
    utterance.rate = 1.1;  // வேகத்தை சற்றே அதிகரித்துள்ளேன் (அவசரக் காலம் என்பதால்)
    utterance.volume = 1.0;   
    window.speechSynthesis.speak(utterance);
}

function stopSOS() {
    // 1. பேசுவதை உடனடியாக நிறுத்தவும்
    window.speechSynthesis.cancel();
    
    // 2. திரும்பத் திரும்பப் பேசுவதை நிறுத்தவும்
    clearInterval(speechInterval);
    
    // 3. Stop பட்டனை மீண்டும் மறைக்கவும்
    const stopButton = document.getElementById("stopButton");
    if (stopButton) {
        stopButton.style.display = "none";
    }
    
    // 4. ஆக்ஷன் லாக்கை பழைய நிலைக்கு மாற்ற உங்கள் HTML-ல் உள்ள ஐடியை இணைத்துள்ளேன்
    const actionLog = document.getElementById("actionLog");
    if (actionLog) {
        actionLog.textContent = "System Ready. Emergency cancelled.";
    }
}
