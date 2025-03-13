<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'connect.php'; // Ensure this file exists and connects to the database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $admission = $_POST['admission'] ?? null;
    $password = $_POST['password'] ?? null;

    // Check if fields are empty
    if (!$admission || !$password) {
        die("Error: All fields are required! <a href='Login.html'>Go back</a>");
    }

    // Open database connection
    $conn = OpenCon();
    if (!$conn) {
        die("Database connection failed: " . mysqli_connect_error());
    }

    // Prepare SQL to get user details
    $sql = "SELECT  username, password FROM user WHERE admission = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Error preparing SQL: " . $conn->error);
    }

    $stmt->bind_param("s", $admission);
    $stmt->execute();
    $stmt->store_result();

    // Check if user exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result( $username, $hashed_password);
        echo "Entered Password: " . $password . "<br>";

if ($stmt->fetch()) {
    echo "Stored Hash: " . $hashed_password . "<br>";

    if (password_verify($password, $hashed_password)) {
        echo "Password matches!";
        $_SESSION['username'] = $username;
        header("Location: Dashboard.html");
        exit();
    } else {
        echo "Password does NOT match!";
    }
} else {
    echo "User not found!";
}

exit();

    $stmt->close();
    CloseCon($conn);
}
}
?>
