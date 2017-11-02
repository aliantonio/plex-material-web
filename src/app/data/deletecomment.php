<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $servername = "198.71.227.93:3306";
    $username = "aliantonio";
    $password = "Rocketshawks23";
    $dbname = "DBaliantonio23";

    $id = $_POST['id'];
    $comment = $_POST['comment'];
    print_r($id);
    print_r($comment);

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    $sql = "UPDATE `MEDIA_RQSTS` SET `COMMENTS`='".$comment."' WHERE ID = '".$id."'";
    //$id = mysqli_insert_id();
//    print_r($id);

    //print_r($sql);

    if ($conn->query($sql) === TRUE) {
        //echo $conn->insert_id;
        echo "Message from server : comment deleted successfully";
        print_r($id);
        print_r($comment);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

?>
