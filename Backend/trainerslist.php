<?php
header('Content-Type: application/json');
include 'db.php'; 

try {
    
    $query = "SELECT name, location, specialization, profile_photo, salary FROM trainerapplications WHERE status = 'approved'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        echo json_encode([
            'success' => false,
            'message' => 'Database query failed: ' . mysqli_error($conn)
        ]);
        exit;
    }

    $trainers = [];

    while ($row = mysqli_fetch_assoc($result)) {
       
        $row['profile_photo'] = $row['profile_photo'] 
            ? "http://192.168.196.174/myapp/" . $row['profile_photo']
            : "";

        
        $row['salary'] = "₹" . number_format($row['salary']) . "/month";

        $trainers[] = $row;
    }

    if (count($trainers) > 0) {
        echo json_encode([
            'success' => true,
            'data' => $trainers
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No approved trainers found'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred: ' . $e->getMessage()
    ]);
}

mysqli_close($conn);
?>
