<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $servername = "198.71.227.93:3306";
    $username = "aliantonio";
    $password = "Rocketshawks23";
    $dbname = "DBaliantonio23";

    $id = $_POST['id'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    $sql = "UPDATE `MEDIA_RQSTS` SET `CMPLTD`='Y' WHERE ID = '".$id."'";
    //$id = mysqli_insert_id();
//    print_r($id);

    //print_r($sql);

    if ($conn->query($sql) === TRUE) {
        echo $conn->insert_id;
        //print_r($conn->insert_id);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

?>
