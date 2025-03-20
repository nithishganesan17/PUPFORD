<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "dogtrain"; 

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}


if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dogName = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
    $gender = isset($_POST['gender']) ? $conn->real_escape_string($_POST['gender']) : '';
    $profilePic = '';


    if (!empty($_FILES['profile_pic']['name'])) {
        $targetDir = "uploads/";
        $fileName = time() . "_" . basename($_FILES["profile_pic"]["name"]); 
        $targetFilePath = $targetDir . $fileName;
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
        $allowedTypes = ['jpg', 'jpeg', 'png'];
        if (!in_array($fileType, $allowedTypes)) {
            die(json_encode(["status" => "error", "message" => "Invalid file type. Only JPG, JPEG, and PNG allowed."]));
        }
        if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $targetFilePath)) {
            $profilePic = $fileName;
        } else {
            die(json_encode(["status" => "error", "message" => "Image upload failed."]));
        }
    }

    if (empty($dogName) || empty($gender)) {
        die(json_encode(["status" => "error", "message" => "Name and gender are required."]));
    }

    $sql = "UPDATE dogprofile SET name='$dogName', gender='$gender'";
    if (!empty($profilePic)) {
        $sql .= ", profile_pic='$profilePic'";
    }
    $sql .= " WHERE id = 1"; 

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Profile updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Update failed: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

$conn->close();
?>
