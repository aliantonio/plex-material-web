<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

  //  echo($_POST);
   // echo($_POST['name']);

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

    $sql = "SELECT * FROM `USERS` WHERE USER_ID='".$_POST['name']."' AND PASSWORD='".$_POST['password']."'";
//    echo($sql);

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $outp[] = $row;

            // $outp .= '{"Name":"'  . $row["USER_ID"] . '",';
            // $outp .= '"Media":"'   . $row["MEDIA_CONTENT"]        . '",';
            // $outp .= '"Timestamp":"'. $row["TIMESTAMP"]     . '"}';
        }
    } else {
        //echo "0 results";
    }

    $conn->close();
    echo json_encode($outp);

?>
