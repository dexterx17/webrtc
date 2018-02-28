<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Front extends Controller
{

    /**
     * $datos Guarda las variables que se van a pasar a la vista en un solo array
     * @var array
     */
    var $datos;

    /**
     * Constructor del controlador Front
     * aqui colocamos lo que vayamos a utilizar en todas las vistas que utiliza este controlador
     */
    public function __construct()
    {
        //setea la variable $active_page para agregar la clase active en el menu principal
        $this->datos['active_page']='home';
    }

    public function home(){
    	return view('home',$this->datos);
    }
	
    public function control_drone(){
        $this->datos['active_page']='control_drone';
        return view('drone.control',$this->datos);
    }

}
