<?php 
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["email"], $data["password"], $data["confirm_password"])) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit();
    }

    $email = $data["email"];
    $password = $data["password"];
    $confirm_password = $data["confirm_password"];
    if ($password !== $confirm_password) {
        echo json_encode(["status" => "error", "message" => "Passwords do not match"]);
        exit();
    }

    $checkStmt = $conn->prepare("SELECT email FROM signup WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email already registered"]);
        exit();
    }
    $checkStmt->close();

    $adminEmails = ["nithishganesan1010@gmail.com"];
    $role = in_array($email, $adminEmails) ? "admin" : "user";
    $stmt = $conn->prepare("INSERT INTO signup (email, password, role) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $password, $role);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "User registered successfully", "role" => $role]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
