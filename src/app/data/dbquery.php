<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "198.71.227.93:3306";
$username = "aliantonio";
$password = "Rocketshawks23";
$dbname = "DBaliantonio23";
$outp = array();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM PLEX_ACTVTY ORDER BY TIMESTAMP DESC";
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
    echo "0 results";
}
//$outp ='{"records":['.$outp.']}';
$conn->close();
echo json_encode($outp);
?>