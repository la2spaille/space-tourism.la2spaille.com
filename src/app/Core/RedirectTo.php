<?php

namespace App\Core;

class RedirectTo {

    public static function home () {
        header('location: /');
        exit();
    }

}
