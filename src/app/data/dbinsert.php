<?php
//  if(isset($_POST['name'])) {

    //$json = json_decode($_POST['name']);

  //  echo($_POST);
   // echo($_POST['name']);
    $size = count($json->User);

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

    $sql = "INSERT INTO `PLEX_ACTVTY` (USER_ID, MEDIA_CONTENT) SELECT '".$_POST['name']."', '".$_POST['media']."' FROM `PLEX_ACTVTY` WHERE NOT EXISTS (SELECT * FROM `PLEX_ACTVTY` WHERE USER_ID='".$_POST['name']."' AND MEDIA_CONTENT='".$_POST['media']."') LIMIT 1";
    echo($sql);



    
//    echo($sql)
    // $i = 0;
    // foreach ($json->User as $row) {
    //     $i++;
    //     foreach($row as $obj) {
    //         if ($obj === end($row)) {
    //             if($i == $size) {
    //                 $sql .= "'$obj');";
    //             } else {
    //                 $sql .= "'$obj'),(";
    //             }
    //         } else {
    //             $sql .= "'$obj',";
    //         }
    //     }
    // }

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

//  } else {
//    echo "something went wrong";
//  }
?>
