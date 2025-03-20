<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

// Check connection
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

// Fetch approved trainers (without approved_date)
$sql = "SELECT id, name, location, specialization, salary, phone, profile_photo
        FROM trainerapplications 
        WHERE status = 'approved'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $trainers = array();

    while ($row = $result->fetch_assoc()) {
        $trainers[] = $row;
    }

    echo json_encode([
        "success" => true,
        "trainers" => $trainers
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No approved trainers found"
    ]);
}

$conn->close();
?>
