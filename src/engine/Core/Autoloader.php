<?php

namespace Engine\Core;

class Autoloader
{

    static function register()
    {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }

    static function autoload($class)
    {
        $rootFolder = explode('\\', $class)[0];

        if ($rootFolder === 'Engine' || $rootFolder === 'App') {
            echo $class;
            echo '<br>';
            $class = str_replace($rootFolder, '', $class);
            $class = str_replace('\\', '/', $class);
            echo ROOT . strtolower($rootFolder) . $class . '.php';
            echo '<br>';

            include ROOT . strtolower($rootFolder) . $class . '.php';
        }
    }

}
