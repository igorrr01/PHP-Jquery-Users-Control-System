<?php 
require __DIR__ . '/db.php';

$cBox = $_POST['cBox'];
$selectedValue = $_POST['selectedValue'];


if($selectedValue == 1 || $selectedValue == 2){

	if($selectedValue == 1){
		$status = 1;
	}else{
		$status = 2;
	}

	foreach ($cBox as $value) {
		$sql = "UPDATE `users` SET `status` = $status WHERE `id` = '$value' ";
		$dbConnect->query($sql);
	}

}elseif($selectedValue == 3){
	foreach ($cBox as $value) {
		$sql = "DELETE FROM `users` WHERE `id` = '$value' ";
		$dbConnect->query($sql);
	}
}else{

$result = [
	'status' => false,
]; 
echo json_encode($result); 
exit;

}

// Формируем массив для JSON ответа
$result = [
	'status' => true,
	'id' => $cBox,
	'selectedValue' => $selectedValue,
	'count' => count($cBox),
]; 

// Переводим массив в JSON
echo json_encode($result); 
exit;
