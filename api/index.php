<?php
class request{
	
	public $app;
        public $_app;
	public $param;
        public $anchor;
        public $root;
	
	public function __construct(){
		
		$this -> seg();
		
	}	
	
	public function seg(){
		
		$var = explode('/',$_GET['url']);
		
		$this->app = array_shift($var);
                $this->_app=  $this->app;
		$this->param = $var;
                $this->anchor="http://".$_SERVER['HTTP_HOST'].str_replace("index.php","",$_SERVER['SCRIPT_NAME']);
                $this->root=$_SERVER['DOCUMENT_ROOT'].str_replace("index.php","",$_SERVER['SCRIPT_NAME']);
                if($this->_app==""){
                    $this->_app="Home";
                }
                
        }
        

}

function fun_api($api){

        if (function_exists($api->app)){
               return call_user_func($api->app,$api->param);
        }
}
function login($param){
        return false;
}


        
$_sys;
$_sys= new request();

if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        //If required
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
     
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");         
     
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
     
        exit(0);
}
    $request_method = $_SERVER["REQUEST_METHOD"];
    $data = json_decode(file_get_contents("php://input"));
    echo json_encode(array("request_method"=>$request_method,"GET"=>$_GET,"POST"=>$data,"SERVER"=>$_SERVER, "fun" =>fun_api($_sys)));

