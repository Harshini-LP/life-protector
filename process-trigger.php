<?php
require 'db.php';

// JSON டேட்டாவை வாங்குதல்
$inputData = json_decode(file_get_contents('php://input'), true);

if ($inputData) {
    $lat = $inputData['lat'] ?? 'Unknown';
    $lng = $inputData['lng'] ?? 'Unknown';
    $network = $inputData['network'] ?? 'ONLINE';

    // அவசர அலர்ட்டை டேட்டாபேஸில் சேமித்தல்
    $stmt = $pdo->prepare("INSERT INTO emergency_triggers (lat, lng, network_state) VALUES (?, ?, ?)");
    $stmt->execute([$lat, $lng, $network]);

    echo json_encode(["status" => "success", "message" => "Alert logged in control room"]);
} else {
    echo json_encode(["status" => "error", "message" => "No data received"]);
}
?>