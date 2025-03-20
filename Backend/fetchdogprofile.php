<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start(); // Start the session

include 'db.php';

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit();
}

$user_id = $_SESSION['user_id']; // Get user ID from session

// Fetch dog profile details for the logged-in user
$query = "SELECT id, name, gender, profile_pic FROM dogprofile WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $profile = $result->fetch_assoc();
    echo json_encode(["status" => "success", "profile" => $profile]);
} else {
    echo json_encode(["status" => "error", "message" => "No profile found for this user"]);
}

$stmt->close();
$conn->close();
?>