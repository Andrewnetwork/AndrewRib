<?php
/*** Debuging Code ***/
error_reporting(-1);
ini_set('display_errors', 'On');
/*********************/

$servername = "localhost";
$username = "mainDude";
$password = "Candyyyy1234";
$DBName = "guestbook_truth";

// Create connection
$conn = new mysqli($servername, $username, $password, $DBName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// Connected Successfully


function submitTruth($conn)
{
	$date = time();
	$text = $_POST["text"];
	
	if ($result = $conn->query("INSERT INTO `truth`(`date`, `text`) VALUES (".$date.",'".addslashes($text)."')" ) ) 
	{
		echo "SUCCESS";
	}	
	else
	{
		echo "FAIL";
	}
}

function getTruths($conn)
{
	echo "var ajaxResult = [";
	
	static $firstTime = true; 
	
	if ($result = $conn->query("SELECT * FROM `truth`") ) 
	{
		
		foreach( $result as $row)
		{
			if(!$firstTime)
			{
				echo(",");
			}
			else
			{
				$firstTime = false;
			}
			
			echo("'".htmlentities(addslashes($row["text"]) )."'");
			
		}
	
		/* free result set */
		$result->close();
	}
	
	echo "];";
}


if( isset( $_POST["action"] ) ){
switch($_POST["action"]){
case "getTruths":
	getTruths($conn);
	break;
case "setTruth":
	submitTruth($conn);
	break;
default:
	echo("null");
}
}


?>