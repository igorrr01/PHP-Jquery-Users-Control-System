<?php 
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') exit;

if(!isset($_POST["selectedValue"]) ){
	$result = [
		'status' => false,
		'error' => [
			'code' => 120,
			'message' => 'No action selected'
		],
	]; 
echo json_encode($result); 
exit;

}

if(!isset($_POST["cBox"]) ){
	$result = [
		'status' => false,
		'error' => [
			'code' => 121,
			'message' => 'Users is not selected!'
		],
	]; 
echo json_encode($result); 
exit;

}


$cBox = $_POST['cBox'];
$selectedValue = $_POST['selectedValue'];

$result = [];
$not_found = [];

if($selectedValue == 1 || $selectedValue == 2){

	if($selectedValue == 1){
		$status = 1;
	}else{
		$status = 2;
	}

	foreach ($cBox as $value) {

		$sql = "SELECT * FROM users WHERE `id` = '$value'";
		$uCount = $dbConnect->rowCount($sql);

		if($uCount == 0){

			$not_found[] = $value;

		}

		$sql = "UPDATE `users` SET `status` = $status WHERE `id` = '$value' ";
		$dbConnect->query($sql);
	}

}elseif($selectedValue == 3){
	foreach ($cBox as $value) {

		$sql = "SELECT * FROM users WHERE `id` = '$value'";
		$uCount = $dbConnect->rowCount($sql);
		
		if($uCount == 0){
			$not_found[] = $value;
		}

		$sql = "DELETE FROM `users` WHERE `id` = '$value' ";
		$dbConnect->query($sql);
	}
}

if(!empty($not_found)){

	$result = [
		'status' => true,
		'error' => null,
		'ids' => $cBox,
		'not_found_ids' => $not_found,
	]; 

}else{

	$result = [
		'status' => true,
		'error' => null,
		'ids' => $cBox,
	]; 

}

echo json_encode($result); 
exit;
