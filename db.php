<?php 
error_reporting(E_ALL);
class DB{

	private $db;

	function __construct ()
	{
		$this->connect();
	}

	public function connect ()
	{

		$this->db = $mysqli = new mysqli('localhost', 'root', '', 'study3');
		if ($mysqli->connect_error)
			throw new Exception("Connect failed: %s", $mysqli->connect_error);
	}

	public function insert($sql){
		$this->db->query($sql);
		return $this->db->insert_id;
	}

	public function query($sql){
		return $this->db->query($sql);
	}

	public function fetchAll($sql,$type=MYSQLI_ASSOC)
	{
		$result=$this->query($sql);
		while(@$row=$result->fetch_array($type)){
			$rows[]=$row;
		}
		
		if(isset($rows)){
			return $rows;
		}
	}

	public function rowCount($sql){
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$stmt->store_result();
		return $stmt->num_rows;
	}

}


// Подключение к БД
$dbConnect = new DB();

 ?>