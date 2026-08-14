<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Life Protector MVP</title>
    <link rel="manifest" href="/manifest.json">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; background: #111; color: #fff; padding: 20px; }
        .sos-btn { width: 200px; height: 200px; background: red; color: white; border-radius: 50%; font-size: 24px; font-weight: bold; border: 10px solid #500; cursor: pointer; margin-top: 50px; box-shadow: 0 0 20px red; }
        .status-box { margin-top: 30px; padding: 15px; border-radius: 8px; font-size: 18px; background: #222; }
    </style>
</head>
<body>

    <h1>🚨 LIFE PROTECTOR</h1>
    <p>Tagline: "Be the Protector. Save a Life."</p>

    <!-- SOS Button -->
    <button class="sos-btn" id="sosButton">SOS (Click 3 Times)</button>
    
    <!-- Stop Audio Button -->
    <button class="stop-btn" onclick="stopSOS()" style="display:none; background-color:red; color:white; id="stopButton">🛑 STOP VOICE</button>
    
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

        // 3-Press Key/Click Monitor Simulation
        sosButton.addEventListener('click', () => {
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

    const guardianNumbers = ["+919876543210", "+919876543211"]; 
    const policeNumber = "100";
    const ambulanceNumber = "108";

    // 💡 ஆஃப்லைனில் இருந்தால் GPS-க்காகக் காத்திருக்காமல் உடனே மெசேஜ் காட்டும் ஸ்மார்ட் லாஜிக்
    if (!navigator.onLine) {
        actionLog.innerHTML = `⚠️ OFFLINE MODE: Net Illai!<br>
        <strong>🚨 SMS Sent to Police (${policeNumber}) & Ambulance (${ambulanceNumber})</strong><br>
        <strong>👨‍👩‍👦 SMS Sent to Guardians (${guardianNumbers.join(', ')})</strong><br><br>
        <strong>📄 SMS Payload: EMERGENCY! Help at https://google.com (Using Last Known GPS)</strong><br><br>
        Calling nearest emergency response node via Fallback Voice...`;
        return; // இங்கேயே கோடு முடிந்துவிடும், பிரீஸ் ஆகாது!
    }

    // ஆன்லைனில் இருந்தால் மட்டும் லோகேஷனைத் தேடும்
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
        .then(data => actionLog.textContent = data.message);
    }, (err) => {
        actionLog.textContent = "Location access denied. Sending basic panic beacon.";
    });
}

    </script>
</body>
</html>
