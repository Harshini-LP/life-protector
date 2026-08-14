let speechInterval;

function startSOS() {
    // 1. முதலில் ஏற்கனவே ஏதாவது பேசிக்கொண்டிருந்தால் அதை நிறுத்தவும்
    window.speechSynthesis.cancel();
    clearInterval(speechInterval);

    // 2. Stop பட்டனைக் காண்பிக்கவும் (சரியான ID: stopButton)
    const stopButton = document.getElementById("stopButton");
    if (stopButton) {
        stopButton.style.display = "inline-block";
    }

    // 3. பேச வேண்டிய வார்த்தை
    const textToSpeak = "Help me! Help me!";
    
    // 4. உடனே பேசச் சொல்லுதல்
    speakText(textToSpeak);

    // 5. ஒவ்வொரு 3 வினாடிக்கும் திரும்பத் திரும்பப் பேச வைக்கும் Loop
    speechInterval = setInterval(() => {
        speakText(textToSpeak);
    }, 3000); 
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; 
    utterance.rate = 1.0;     
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
    
    alert("Voice guide stopped.");
}
