let clickCount = 0;
let voiceLoopInterval = null;

const sosButton = document.getElementById('sosButton');
const stopVoiceButton = document.getElementById('stopVoiceButton');

// Function to trigger loud emergency voice announcements
function speakEmergencyAlert() {
  // Clear any existing speech queues before starting a new one
  window.speechSynthesis.cancel(); 

  const alertText = "Emergency! Emergency! Life Protector activated. Please help me.";
  const utterance = new SpeechSynthesisUtterance(alertText);
  
  // Settings for maximum clarity and urgency
  utterance.rate = 1.0;  // Normal human speed
  utterance.pitch = 1.1; // Slightly high-pitched to grab immediate attention
  utterance.volume = 1.0; // Forces maximum browser volume output
  
  window.speechSynthesis.speak(utterance);
}

// SOS Button Event Listener (Requires 3 clicks)
sosButton.addEventListener('click', () => {
  clickCount++;
  
  if (clickCount === 3) {
    // Show the Stop Voice button on screen
    stopVoiceButton.style.display = 'block';
    
    // Speak immediately
    speakEmergencyAlert();
    
    // Set up a loop to repeat the voice alert every 6 seconds
    voiceLoopInterval = setInterval(() => {
      speakEmergencyAlert();
    }, 6000);
    
    // Reset click count counter for subsequent safety uses
    clickCount = 0; 
  }
});

// Stop Voice Button Event Listener
stopVoiceButton.addEventListener('click', () => {
  // 1. Terminate all active browser speaking queues immediately
  window.speechSynthesis.cancel();
  
  // 2. Kill the repeating interval loop
  if (voiceLoopInterval) {
    clearInterval(voiceLoopInterval);
    voiceLoopInterval = null;
  }
  
  // 3. Hide the stop button again until the next real emergency
  stopVoiceButton.style.display = 'none';
});
