<?php
include './db_controller.php';

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
            $data = json_decode(file_get_contents("php://input"));
            $param = array();
            foreach( $this->param as $clave => $valor){
              $param[$clave] = $valor;
            }
            foreach( $data as $clave => $valor){
              $param[$clave] = $valor;
            }
            $this->param=$param;

        }


}

function generar_token(){
  return date("ymdHis").str_pad(rand(0,999), 3, "0", STR_PAD_LEFT);
}

function get_files($dir){

  $files_=scandir($dir,1);
  $files_len=count($files_)-2;
  if($files_len>0){
    array_pop($files_);
    array_pop($files_);
    $file=array();
    foreach($files_ as $key=>$value){
      $nombre_archivo = $value;
      $file_time=filemtime("$dir/$nombre_archivo");
      $file_time_ho=(strpos($nombre_archivo, ".xml")===false)?'0':'1';
      $fecha = strftime("%Y/%m/%d %H:%M:%S", $file_time);
      $a_path=explode("/folios","$dir/$nombre_archivo");
      $file[$file_time.$file_time_ho]=array("name"=>$nombre_archivo,"date"=>$fecha,"path"=>($file_time_ho=="0"?"downloadPdf":"downloadXml").$a_path[1],"type"=>($file_time_ho=="0"?"PDF":"xml"));
    }
    krsort($file);
    $temp=$file;
    $file=array();
    while(count($temp)>0){
      $index = count($file);
      $file[$index] = array_shift($temp);
      $file[$index]['row'] = $index;
    }
    return array("ls"=>$file,"access"=>true);
  }
  else{
    return array("ls"=>null,"access"=>false);
  }

}
function forcingDownloads($file) {

      // Quick check to verify that the file exists
      if( !file_exists($file) ) die("File not found");
      // Force the download
      header("Content-Disposition: attachment; filename=\"" . basename($file) . "\"");
      header("Content-Length: " . filesize($file));
      header("Content-Type: application/octet-stream;");
      readfile($file);
}


function fun_api($api){

        if (function_exists($api->app)){
               return call_user_func($api->app,$api->param);
        }
}
function login($param){
  $array=array();
  $dir = './../folios/'.strtoupper($param['rfc']);
        if (is_dir($dir)) {
          $array['token'] = generar_token();
          $array['access'] = true;
        }
        else{
          $array['token'] = "000000000000000";
          $array['access'] = false;
        }

        return  $array;
}
function getFilesInFolder($param){
      $array=array();
      $dir = './../folios/'.strtoupper($param[0]);
      if (is_dir($dir)) {
        $array = get_files($dir);
      }
      else{
        $array['ls'] = null;
        $array['access'] = false;
      }
      return $array;
}
function downloadPdf($param){
  forcingDownloads("./../folios/".$param[0]."/".$param[1]);
}
function downloadXml($param){
  forcingDownloads("./../folios/".$param[0]."/".$param[1]);
}







$json_method=array("downloadPdf","downloadXml");
$_sys;
$_sys= new request();
if(!in_array($_sys->app,$json_method)){
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
}
    $request_method = $_SERVER["REQUEST_METHOD"];
    session_start();
    if(!in_array($_sys->app,$json_method)){
      echo json_encode(array("session"=>$_SESSION,"_sys"=>$_sys, "fun" =>fun_api($_sys)));
    }
    else{
      fun_api($_sys);
    }

