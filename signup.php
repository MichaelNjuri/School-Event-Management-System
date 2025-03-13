<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'connect.php'; // Ensure this file exists and is correct

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $admission = $_POST['admission'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Debugging: Print form data to check if it's being received
    if (empty($username) || empty($admission) || empty($password)) {
        die("Error: Missing form fields!");
    }

    if ($password !== $confirm_password) {
        die("Passwords do not match! <a href='Signup.html'>Go back</a>");
    }

    // Check if database connection works
    $conn = OpenCon();
    if (!$conn) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO user (username, admission, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        die("Error in SQL preparation: " . $conn->error);
    }

    $stmt->bind_param("sss", $username, $admission, $hashed_password);

    if ($stmt->execute()) {
        // Redirect to login page after successful signup
        header("Location: Login.html");
        exit();
    } else {
        echo "Error inserting data: " . $stmt->error;
    }

    $stmt->close();
    CloseCon($conn);
}
?>
