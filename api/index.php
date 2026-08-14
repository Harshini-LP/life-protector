<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Life Protector MVP</title>
    <link rel="manifest" href="/manifest.json">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; background: #111; color: #fff; padding: 20px; }
        .sos-btn { width: 200px; height: 200px; background: red; color: white; border-radius: 50%; font-size: 24px; font-weight: bold; border: 10px solid #500; cursor: pointer; margin-top: 50px; box-shadow: 0 0 20px red; display: inline-block; user-select: none; -webkit-tap-highlight-color: transparent; }
        .stop-btn { display: none; background-color: #d9534f; color: white; padding: 12px 24px; font-size: 18px; font-weight: bold; border: none; border-radius: 25px; cursor: pointer; margin: 20px auto; box-shadow: 0 4px 10px rgba(217, 83, 79, 0.4); }
        .status-box { margin-top: 30px; padding: 15px; border-radius: 8px; font-size: 18px; background: #222; }
    </style>
</head>
<body>

    <h1>🚨 LIFE PROTECTOR</h1>
    <p>Tagline: "Be the Protector. Save a Life."</p>

  <!-- Main SOS Emergency Button -->
<button id="sosButton" class="sos-btn">
  SOS (Click 3 Times)
</button>

<!-- New Stop Voice Control Button -->
<button id="stopVoiceButton" class="stop-btn" style="display: none;">
  🛑 STOP VOICE
</button>

   
    <div class="status-box" id="statusBox">
        Network Status: <span id="netStatus" style="color: lime;">Checking...</span>
        <p id="actionLog">System Ready. Press SOS in emergency.</p>
    </div>

    <script>
        // PWA Service Worker Registration
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }

        let clickCount = 0;
        const sosButton = document.getElementById('sosButton');
        const netStatus = document.getElementById('netStatus');
        const actionLog = document.getElementById('actionLog');

        // Network Detector
        function updateNetworkStatus() {
            if (navigator.onLine) {
                netStatus.textContent = "ONLINE (Data Ready)";
                netStatus.style.color = "lime";
            } else {
                netStatus.textContent = "OFFLINE (No Internet)";
                netStatus.style.color = "orange";
            }
        }
        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);
        updateNetworkStatus();

        // 💡 மொபைல் பிரவுசர்களை முதல் க்ளிக்கிலேயே ஏமாற்றி வாய்ஸ் என்ஜினை ஆன் செய்யும் தந்திரம் (User Gesture Unlock)
        function unlockMobileVoice() {
            const silentUtterance = new SpeechSynthesisUtterance("");
            window.speechSynthesis.speak(silentUtterance);
        }

        // 3-Press Click Monitor Simulation
        sosButton.addEventListener('click', () => {
            // முதல் முறை தொடும்போதே வாய்ஸ் என்ஜின் அன்லாக் ஆகிவிடும்!
            if (clickCount === 0) {
                unlockMobileVoice();
            }

            clickCount++;
            actionLog.textContent = `Trigger clicks: ${clickCount}/3`;

            if (clickCount >= 3) {
                executeEmergencyProtocol();
                clickCount = 0; // Reset
            }
        });

        // Main Emergency Workflow Engine
        function executeEmergencyProtocol() {
            if ('vibrate' in navigator) navigator.vibrate(200);
            actionLog.textContent = "Life Protector activated. Stay calm.";

            // 3 முறை அழுத்தியதும் voice.js-ல் உள்ள வாய்ஸ் ஃபங்ஷன் இயங்கும்
            if (typeof startSOS === "function") {
                startSOS();
            }

            const guardianNumbers = ["+919876543210", "+919876543211"];
            const policeNumber = "100";
            const ambulanceNumber = "108";

            if (!navigator.onLine) {
                actionLog.innerHTML = `⚠️ OFFLINE MODE: Net Illai!<br>
                <strong>🚨 SMS Sent to Police (${policeNumber}) & Ambulance (${ambulanceNumber})</strong><br>
                <strong>👨‍👩‍👦 SMS Sent to Guardians (${guardianNumbers.join(', ')})</strong><br><br>
                <strong>📄 SMS Payload: EMERGENCY! Help at https://google.com (Using Last Known GPS)</strong><br><br>
                Calling nearest emergency response node via Fallback Voice...`;
                return; 
            }

            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                actionLog.innerHTML = "🔴 ONLINE MODE: Sending Live GPS & 10s Buffer to Control Room...";
               
                fetch('/process-trigger.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lat: lat, lng: lng, network: 'ONLINE' })
                })
                .then(res => res.json())
                .then(data => actionLog.textContent = data.message)
                .catch(err => console.log("Fetch/Mock active"));
            }, (err) => {
                actionLog.textContent = "Location access denied. Sending basic panic beacon.";
            });
        }
    </script>

   

    <!-- Link your voice file here -->
    <script src="voice.js"></script>
</body>
</html>
   
