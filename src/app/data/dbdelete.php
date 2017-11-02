<?php
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

$servername = "198.71.227.93:3306";
$username = "aliantonio";
$password = "Rocketshawks23";
$dbname = "DBaliantonio23";

$param = ($_POST['data']);
//print_r("DELETE FROM PLEX_ACTVTY WHERE SEQ_NUM = " . $param . " ");

//Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "DELETE FROM PLEX_ACTVTY WHERE SEQ_NUM = " . $param . " ";
$result = $conn->query($sql);

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>