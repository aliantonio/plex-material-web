<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $servername = "198.71.227.93:3306";
    $username = "aliantonio";
    $password = "Rocketshawks23";
    $dbname = "DBaliantonio23";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    $name = $_POST['name'];
    $userpassword = $_POST['userpassword'];

    $sql = "INSERT INTO `USERS` (USER_ID, PASSWORD) VALUES ('".$name."','".$userpassword."') ";

    if ($conn->query($sql) === TRUE) {
        echo "New user registered";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();

?>
