<?php

namespace App\Core;

use \Engine\Core\Autoloader;
use \App\Config\Route;

class App {

    public static function init () {
        require ROOT . 'engine/Core/Autoloader.php';
        Autoloader::register();

        Route::init();
    }

}
