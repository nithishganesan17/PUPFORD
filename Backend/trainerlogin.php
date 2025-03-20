<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start(); // Start the session

include 'db.php'; // Include database connection file

$response = ["status" => "error", "message" => ""];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['email']) && isset($data['password'])) {
        $email = $data['email'];
        $password = $data['password']; // Direct password (not hashed)

        // Check if trainer exists
        $query = "SELECT * FROM trainers WHERE email = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            // Direct password comparison (no hashing)
            if ($password === $user['password']) {
                // Store email and password in session
                $_SESSION['email'] = $email;
                $_SESSION['password'] = $password;

                // Check if the trainer has submitted an application
                $appQuery = "SELECT * FROM trainerapplications WHERE email = ?";
                $appStmt = $conn->prepare($appQuery);
                $appStmt->bind_param("s", $email);
                $appStmt->execute();
                $appResult = $appStmt->get_result();

                if ($appResult->num_rows > 0) {
                    $response["status"] = "success";
                    $response["message"] = "Application already submitted.";
                    $response["redirect"] = "ApplicationStatusScreen";
                } else {
                    $response["status"] = "success";
                    $response["message"] = "Login successful.";
                    $response["redirect"] = "TrainerApplication";
                }
            } else {
                $response["message"] = "Invalid password.";
            }
        } else {
            $response["message"] = "No trainer found with this email.";
        }
    } else {
        $response["message"] = "Email and password are required.";
    }
} else {
    $response["message"] = "Invalid request method.";
}

echo json_encode($response);
?>