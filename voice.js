let speechInterval;

function startSOS() {
    // 1. முதலில் ஏற்கனேவே ஏதாவது பேசிக்கொண்டிருந்தால் அதை நிறுத்தவும்
    window.speechSynthesis.cancel();
    clearInterval(speechInterval);

    // 2. Stop பட்டனைக் காண்பிக்கவும்
    document.getElementById("stopBtn").style.display = "inline-block";

    // 3. பேச வேண்டிய வார்த்தைகளை அமைத்தல்
    const textToSpeak = "Help me! Help me!";
    
    // 4. "Help me" என்று உடனே பேசச் சொல்லுதல்
    speakText(textToSpeak);

    // 5. பயனர் 'Stop' செய்யும் வரை ஒவ்வொரு 3 வினாடிக்கும் இதைத் திரும்பத் திரும்பப் பேச வைக்கும் (Loop)
    speechInterval = setInterval(() => {
        speakText(textToSpeak);
    }, 3000); 
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // ஆங்கில உச்சரிப்பு
    utterance.rate = 1.0; // பேசும் வேகம் (தேவைப்பட்டால் கூட்டிக் கொள்ளலாம்)
    utterance.volume = 1.0; // முழு சத்தம் (Full volume)
    window.speechSynthesis.speak(utterance);
}

function stopSOS() {
    // 1. பேசுவதை உடனடியாக நிறுத்தவும்
    window.speechSynthesis.cancel();
    
    // 2. திரும்பத் திரும்பப் பேசுவதை (Loop) நிறுத்தவும்
    clearInterval(speechInterval);
    
    // 3. Stop பட்டனை மீண்டும் மறைக்கவும்
    document.getElementById("stopBtn").style.display = "none";
    
    alert("Voice guide stopped.");
}
