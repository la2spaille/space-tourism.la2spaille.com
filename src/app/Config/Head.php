<?php

namespace App\Config;

class Head {

    public static function data () {
        $head['urlBase'] = 'https://space-tourism-by-la2spaille.herokuapp.com'; // Desktop version only with protocol
        $head['serverName'] = 'space-tourism-by-la2spaille.herokuapp.com'; // Desktop or mobile without protocol

        $head['twitter']['pseudo']  = '@la2spaille';
        $head['twitter']['creator'] = '@la2spaille';

        return $head;
    }

}