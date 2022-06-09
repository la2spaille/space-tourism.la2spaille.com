<?php

namespace App\Core;

class Constant {

    public static function init () {
        $root = substr($_SERVER['DOCUMENT_ROOT'], 0, -6);
        define('ROOT', $root);
    }

}
