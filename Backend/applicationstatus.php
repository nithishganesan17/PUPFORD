<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start(); // Start the session

require 'db.php'; // Include database connection file

$response = ["success" => false, "message" => "", "data" => []];

// Check if email is stored in session
if (!isset($_SESSION['email'])) {
    $response["message"] = "User not logged in.";
    echo json_encode($response);
    exit;
}

$email = $_SESSION['email']; // Get email from session

// Fetch application details from the database
$query = "SELECT * FROM trainerapplications WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $application = $result->fetch_assoc();

    // Prepare response data
    $response["success"] = true;
    $response["message"] = "Application found.";
    $response["data"] = [
        "name" => $application["name"],
        "dob" => $application["date_of_birth"],
        "phone" => $application["phone"],
        "gender" => $application["gender"],
        "qualification" => $application["qualification"],
        "experience" => $application["experience"],
        "specialization" => $application["specialization"],
        "address" => $application["address"],
        "salary" => $application["salary"],
        "email" => $application["email"],
        "location" => $application["location"],
        "status" => $application["status"],
        "profile_photo" => $application["profile_photo"],
        "resume" => $application["resume"],
    ];
} else {
    $response["message"] = "No application found for this email.";
}

// Close connection
$stmt->close();
$conn->close();

echo json_encode($response);
?>