<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php'; // Include database connection file

$response = ["success" => false, "message" => ""];

// Ensure request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response["message"] = "Invalid request method.";
    echo json_encode($response);
    exit;
}

// Check if trainer ID is provided
if (!isset($_POST['trainer_id'])) {
    $response["message"] = "Trainer ID is required.";
    echo json_encode($response);
    exit;
}

$trainerId = $_POST['trainer_id'];

// Update trainer status to APPROVED
$query = "UPDATE trainerapplications SET status = 'APPROVED' WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $trainerId);

if ($stmt->execute()) {
    $response["success"] = true;
    $response["message"] = "Trainer approved successfully.";
} else {
    $response["message"] = "Failed to approve trainer.";
}

// Close connection
$stmt->close();
$conn->close();

echo json_encode($response);
?>