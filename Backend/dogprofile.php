<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST["name"]) || !isset($_POST["gender"]) || !isset($_FILES["profile_pic"])) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit();
    }

    $dog_name = $_POST["name"];
    $dog_gender = $_POST["gender"];
    $allowed_genders = ["Male", "Female"];

    if (!in_array($dog_gender, $allowed_genders)) {
        echo json_encode(["status" => "error", "message" => "Invalid gender selected"]);
        exit();
    }

    // Handle File Upload
    $uploadDir = "uploads/";
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = basename($_FILES["profile_pic"]["name"]);
    $targetFilePath = $uploadDir . time() . "_" . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
    $allowedTypes = ["jpg", "jpeg", "png", "gif"];

    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(["status" => "error", "message" => "Invalid file type"]);
        exit();
    }

    if (!move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $targetFilePath)) {
        echo json_encode(["status" => "error", "message" => "File upload failed"]);
        exit();
    }

    // Insert into database
    $insert_query = "INSERT INTO dogprofile (name, gender, profile_pic) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insert_query);
    $stmt->bind_param("sss", $dog_name, $dog_gender, $targetFilePath);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Profile created successfully", "profile_url" => $targetFilePath]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to create profile"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>