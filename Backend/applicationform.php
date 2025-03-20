<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

$response = ["success" => false, "message" => ""];

// Ensure request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response["message"] = "Invalid request method.";
    echo json_encode($response);
    exit;
}

// Check if required fields exist
if (!isset($_POST['name'], $_POST['dob'], $_POST['phone'], $_POST['gender'], $_POST['qualification'], $_POST['experience'], $_POST['specialization'], $_POST['address'], $_POST['salary'], $_POST['email'], $_POST['location'])) {
    $response["message"] = "Missing required fields.";
    echo json_encode($response);
    exit;
}

// Get form data
$name = $_POST['name'];
$dob = $_POST['dob'];
$phone = $_POST['phone'];
$gender = $_POST['gender'];
$qualification = $_POST['qualification'];
$experience = $_POST['experience'];
$specialization = $_POST['specialization'];
$address = $_POST['address'];
$salary = $_POST['salary'];
$email = $_POST['email'];
$location = $_POST['location'];
$status = 'PENDING'; // Default status

// Handle Profile Photo Upload
$target_dir = "uploads/";
$profile_photo_path = "";
$resume_path = "";

// Ensure upload directory exists
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Handle profile photo
if (isset($_FILES["profile_photo"])) {
    $profile_photo_name = basename($_FILES["profile_photo"]["name"]);
    $profile_photo_path = $target_dir . time() . "_" . $profile_photo_name; // Unique filename
    move_uploaded_file($_FILES["profile_photo"]["tmp_name"], $profile_photo_path);
}

// Handle resume upload
if (isset($_FILES["resume"])) {
    $resume_name = basename($_FILES["resume"]["name"]);
    $resume_path = $target_dir . time() . "_" . $resume_name; // Unique filename
    move_uploaded_file($_FILES["resume"]["tmp_name"], $resume_path);
}

// Insert into database using prepared statement
$query = "INSERT INTO trainerapplications (name, date_of_birth, phone, gender, qualification, experience, specialization, address, salary, email, location, status, profile_photo, resume) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssssssssssssss", $name, $dob, $phone, $gender, $qualification, $experience, $specialization, $address, $salary, $email, $location, $status, $profile_photo_path, $resume_path);

if ($stmt->execute()) {
    $response["success"] = true;
    $response["message"] = "Application submitted successfully!";
} else {
    $response["message"] = "Failed to submit application.";
}

// Close connection
$stmt->close();
$conn->close();

echo json_encode($response);
?>