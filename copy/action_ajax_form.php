<?php 
require __DIR__ . '/db.php';

$firstName = htmlspecialchars($_POST["first-name"]);
$lastName = htmlspecialchars($_POST["last-name"]);
$roleSelect = htmlspecialchars($_POST["roleSelect"]);
$uId = htmlspecialchars($_POST["u-id"]);

if(isset($_POST["delAction"]) && $_POST["delAction"] == true ){

		$uIdDel = htmlspecialchars($_POST["del-u-id"]);
		$sql = "DELETE FROM `users` WHERE `id` = '$uIdDel' ";
		$dbConnect->query($sql);

		// Формируем массив для JSON ответа
	    $result = [
	    	'status' => true,
	    	'action' => 'delete',
	    	'uId' => $uIdDel,
	    ]; 

	    // Переводим массив в JSON
	    echo json_encode($result); 
	    exit;
}

// Toggle 
if(!isset($_POST["toggle"])){
	$toggle = 0;
}else{
	$toggle = 1;
}

if (!empty($firstName)  && !empty($lastName) && $roleSelect != 0) { 

	if(empty($uId)){

		$sql = "INSERT INTO users (first_name, last_name, role, status) VALUES ('$firstName', '$lastName', '$roleSelect', '$toggle')";
		$last_id = $dbConnect->insert($sql);
		// Формируем массив для JSON ответа
		$result = [
		    	'firstName' => $firstName,
		    	'lastName' => $lastName,
		    	'status' => true,
		    	'toggle' => $toggle,
		    	'roleSelect' => $roleSelect,
		    	'uId' => $last_id,
		    	'action' => 'add',
		    ]; 

		 // Переводим массив в JSON
		 echo json_encode($result); 
	}else{

		$sql = "UPDATE `users` SET `first_name` = '$firstName', `last_name` = '$lastName', `status` = '$toggle', `role` = '$roleSelect' WHERE `id` = '$uId' ";
		$dbConnect->query($sql);

		// Формируем массив для JSON ответа
		$result = [
		    	'uId' => $uId,
		    	'firstName' => $firstName,
		    	'lastName' => $lastName,
		    	'status' => true,
		    	'toggle' => $toggle,
		    	'roleSelect' => $roleSelect,
		    	'action' => 'edit',
			]; 

		// Переводим массив в JSON
		echo json_encode($result); 			
	}

}else{

// Формируем массив для JSON ответа
$result = ['status' => false ]; 

// Переводим массив в JSON
echo json_encode($result); 
}
	