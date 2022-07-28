<?php 
require __DIR__ . '/db.php';

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
}else{

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
