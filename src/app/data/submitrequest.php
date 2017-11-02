<?php

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
    
    //$sql = "REPLACE INTO PLEX_ACTVTY (USER_ID, MEDIA_CONTENT) VALUES ('".$_POST['name']."','".$_POST['media']."')" ;

    $sql = "INSERT INTO `MEDIA_RQSTS` (USER_ID, REQUEST, CMPLTD) VALUES ('".$_POST['name']."','".$_POST['request']."','N')";
    echo($sql);

    if ($conn->query($sql) === TRUE) {
        echo "Request was submitted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

?>
