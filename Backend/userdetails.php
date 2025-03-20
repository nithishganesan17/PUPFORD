<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$name     = $_POST['name'];
$location = $_POST['location'];
$breed    = $_POST['breed'];
$contact  = $_POST['contact'];
$date     = $_POST['date'];
$time     = $_POST['time'];


if (empty($name) || empty($location) || empty($breed) || empty($contact) || empty($date) || empty($time)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit();
}


$sql = "INSERT INTO userdetails (name, location, breed, contact, date, time) VALUES ('$name', '$location', '$breed', '$contact', '$date', '$time')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success", "message" => "User details inserted successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
