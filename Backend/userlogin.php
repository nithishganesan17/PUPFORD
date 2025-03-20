<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start(); 

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["email"], $data["password"])) {
        echo json_encode(["status" => "error", "message" => "Email and password are required"]);
        exit();
    }

    $email = $data["email"];
    $password = $data["password"];

    
    $stmt = $conn->prepare("SELECT id, email, password, role FROM signup WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($db_id, $db_email, $db_password, $role);
        $stmt->fetch();

        
        if ($password === $db_password) {
           
            $_SESSION['user_id'] = $db_id; 
            $_SESSION['email'] = $db_email; 
            $_SESSION['role'] = $role; 

            
            if ($role === "user") {
                $stmt2 = $conn->prepare("SELECT id FROM dogprofile WHERE user_id = ?");
                $stmt2->bind_param("i", $db_id);
                $stmt2->execute();
                $stmt2->store_result();

                $hasDogProfile = $stmt2->num_rows > 0; 
                $stmt2->close();
            } else {
                $hasDogProfile = false;
            }

            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "role" => $role,
                "user_id" => $db_id,
                "hasDogProfile" => $hasDogProfile, 
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>