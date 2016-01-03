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
	echo( "HERE" );
	$date = time();
	$text = $_POST["text"];
	$data = str_replace(PHP_EOL, " ", $text);
	$data = htmlentities( $conn->real_escape_string($data) ); //htmlentities(mysqli_real_escape_string($text));
	
	if ($result = $conn->query("INSERT INTO `guestMessages`(`text`) VALUES (\"".$data."\")" ) ) 
	{
		echo "SUCCESS";
	}	
	else
	{
		echo( error_get_last());
	}
}

function getTruths($conn)
{
	echo "var ajaxResult = [";
	
	static $firstTime = true; 
	
	if ($result = $conn->query("SELECT * FROM `guestMessages` ORDER BY `id`DESC") ) 
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
			
			echo("\"".(str_replace(PHP_EOL, " ", $row["text"]))."\"");
			
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