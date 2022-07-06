<?php 
require __DIR__ . '/db.php';

$firstName = htmlspecialchars($_POST["first-name"]);
$lastName = htmlspecialchars($_POST["last-name"]);
$roleSelect = htmlspecialchars($_POST["roleSelect"]);
$uId = htmlspecialchars($_POST["u-id"]);


if(isset($_POST["delAction"]) && $_POST["delAction"] == true ){
		$uIdDel = htmlspecialchars($_POST["del-u-id"]);

		$sql = "SELECT * FROM users WHERE `id` = '$uIdDel'";
		$uCount = $dbConnect->rowCount($sql);

		if($uCount == 0){

			$result = [
				'status' => false, 
				'error' => [
					'code' => 110,
					'message' => 'User is not found',
				]
			]; 

			echo json_encode($result); 
			exit;
		}

		$sql = "DELETE FROM `users` WHERE `id` = '$uIdDel' ";
		$dbConnect->query($sql);

	    // Формируем массив для JSON ответа
		$result = [
			'status' => true,
			'error' => null,
			'action' => 'delete',
			'uCount' => $uCount,
			'user' =>
				[
					'uId' => $uIdDel,
				]
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
				'status' => true,
				'error' => null,
				'action' => 'add',
				'user' =>
		    		[
		    			'uId' => $last_id,
		    			'firstName' => $firstName,
		    			'lastName' => $lastName,
		    			'toggle' => $toggle,
		    			'roleSelect' => $roleSelect,
		    		]
		    ]; 

		 // Переводим массив в JSON
		 echo json_encode($result); 
	}else{

		$sql = "SELECT * FROM users WHERE `id` = '$uId'";
		$uCount = $dbConnect->rowCount($sql);

		if($uCount == 0){

			$result = [
				'status' => false, 
				'error' => [
					'code' => 111,
					'message' => 'User is not found',
				]
			]; 

			echo json_encode($result); 
			exit;
		}

		$sql = "UPDATE `users` SET `first_name` = '$firstName', `last_name` = '$lastName', `status` = '$toggle', `role` = '$roleSelect' WHERE `id` = '$uId' ";
		$dbConnect->query($sql);

		// Формируем массив для JSON ответа
		$result = [
				'status' => true,
				'error' => null,
				'action' => 'edit',
				'user' =>
		    		[
		    			'uId' => $uId,
		    			'firstName' => $firstName,
		    			'lastName' => $lastName,
		    			'status' => true,
		    			'toggle' => $toggle,
		    			'roleSelect' => $roleSelect,
		    		]
		    ]; 

		// Переводим массив в JSON
		echo json_encode($result); 			
	}

}else{

if($roleSelect == 0){
	$message = 'Role must be selected!';
}else{
	$message = 'Fields must not be empty!';	
}
// Формируем массив для JSON ответа
$result = [
	'status' => false, 
	'error' => [
		'code' => 100,
		'message' => $message,
		'role' => $roleSelect,
	]
]; 

// Переводим массив в JSON
echo json_encode($result); 
}
	