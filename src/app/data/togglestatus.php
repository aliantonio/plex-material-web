<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $servername = "198.71.227.93:3306";
    $username = "aliantonio";
    $password = "Rocketshawks23";
    $dbname = "DBaliantonio23";

    $status = $_POST['STATUS'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    if($status == 'ACTIVE') {
        $sql = "UPDATE `CURR_STATUS` SET `STAT_ID`=0,`STAT_DESC`='$status' WHERE 1";
    } else {
        $sql = "UPDATE `CURR_STATUS` SET `STAT_ID`=1,`STAT_DESC`='$status' WHERE 1";
    }
    

    //print_r($sql);

    if ($conn->query($sql) === TRUE) {
        //echo $conn->insert_id;
        echo "UPDATED MAINTENANCE STATUS SUCCESSFULLY";
        //print_r($conn->insert_id);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

?>
