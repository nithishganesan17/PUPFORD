<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

$query = "SELECT name, date_of_birth, phone, email, gender, location, experience, qualification, specialization, address, salary, profile_photo,status ,resume FROM trainerapplications";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $applications = [];

    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }

    echo json_encode(["success" => true, "data" => $applications]);
} else {
    echo json_encode(["success" => false, "message" => "No applications found"]);
}

$conn->close();
?>
