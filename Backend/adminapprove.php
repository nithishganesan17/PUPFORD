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

// Check if email and action are provided
if (!isset($_POST['email']) || !isset($_POST['action'])) {
    $response["message"] = "Email and action are required.";
    echo json_encode($response);
    exit;
}

$email = $_POST['email'];
$action = $_POST['action'];

// Validate action
if ($action !== 'approve' && $action !== 'reject') {
    $response["message"] = "Invalid action. Use 'approve' or 'reject'.";
    echo json_encode($response);
    exit;
}

// Update status in the database
$status = $action === 'approve' ? 'APPROVED' : 'REJECTED';
$query = "UPDATE trainerapplications SET status = ? WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $status, $email);

if ($stmt->execute()) {
    $response["success"] = true;
    $response["message"] = "Application status updated successfully.";
} else {
    $response["message"] = "Failed to update application status.";
}

// Close connection
$stmt->close();
$conn->close();

echo json_encode($response);
?>