<?php
header("Content-Type: application/json");
include 'db.php'; // Include database connection file

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['email']) && isset($data['password']) && isset($data['confirmPassword'])) {
        $email = $data['email'];
        $password = $data['password'];
        $confirmPassword = $data['confirmPassword'];

        if ($password !== $confirmPassword) {
            $response["status"] = "error";
            $response["message"] = "Passwords do not match.";
            echo json_encode($response);
            exit();
        }

        // Check if email already exists
        $check_query = "SELECT * FROM trainers WHERE email = ?";
        $stmt = $conn->prepare($check_query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response["status"] = "error";
            $response["message"] = "Email already exists.";
        } else {
            // Insert trainer into database (without password hashing)
            $insert_query = "INSERT INTO trainers (email, password, confirmPassword) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($insert_query);
            $stmt->bind_param("sss", $email, $password, $confirmPassword);

            if ($stmt->execute()) {
                $response["status"] = "success";
                $response["message"] = "Trainer registered successfully.";
            } else {
                $response["status"] = "error";
                $response["message"] = "Registration failed.";
            }
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "All fields are required.";
    }
} else {
    $response["status"] = "error";
    $response["message"] = "Invalid request method.";
}

echo json_encode($response);
?>
