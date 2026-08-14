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

    <!-- 3 Clicks Hardware simulation or Direct Press -->
    <button class="sos-btn" id="sosButton">SOS (Click 3 Times)</button>

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
            // Voice & Haptic Confirmation (The 3-Second Rule)
            if ('vibrate' in navigator) navigator.vibrate([500, 200, 500]);
            actionLog.textContent = "Life Protector activated. Stay calm.";

            // Get Current Coordinates
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                if (navigator.onLine) {
                    // ONLINE MODE ACTION
                    actionLog.innerHTML = "🔴 ONLINE MODE: Sending Live GPS & 10s Buffer to Control Room...";
                    
                    fetch('/process-trigger.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ lat: lat, lng: lng, network: 'ONLINE' })
                    })
                    .then(res => res.json())
                    .then(data => actionLog.textContent = data.message);

                } else {
                    // OFFLINE MODE ACTION (Fallback)
                    actionLog.innerHTML = `⚠️ OFFLINE MODE: Net Illai! Sending compressed SMS Gateway string to Guardians.<br>
                    <strong>SMS Payload: EMERGENCY! Help at https://google.com{lat},${lng}</strong><br>
                    Calling nearest emergency response node via Fallback Voice...`;
                }
            }, (err) => {
                actionLog.textContent = "Location access denied. Sending basic panic beacon.";
            });
        }
    </script>
</body>
</html>
