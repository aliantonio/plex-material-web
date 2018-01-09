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
    $media = $_POST['media'];
    $media = str_replace("'", "", $media);
    $show = $_POST['show'];
    $show = str_replace("'", "", $show);
    $show = str_replace("%SHOWTITLE", "", $show);
    $season = $_POST['season'];
    $season = str_replace("'", "", $season);
    $season = str_replace("%SEASON", "", $season);
    
    $sql = "INSERT INTO `PLEX_ACTVTY` (USER_ID, MEDIA_CONTENT, SHOW_TITLE, SEASON, EPISODE_NUM, TYPE) SELECT '".$_POST['name']."', '".$media."', '".$show."', '".$season."', '".$_POST['episode']."', '".$_POST['type']."' FROM `PLEX_ACTVTY` WHERE NOT EXISTS (SELECT * FROM `PLEX_ACTVTY` WHERE USER_ID='".$_POST['name']."' AND MEDIA_CONTENT='".$media."' AND SHOW_TITLE='".$show."' AND SEASON='".$season."' AND EPISODE_NUM='".$_POST['episode']."' AND TYPE='".$_POST['type']."') LIMIT 1";
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
