<?php

namespace App\Config;

class Head {

    public static function data () {
        $head['urlBase'] = 'https://www.la2spaille.com'; // Desktop version only with protocol
        $head['serverName'] = 'www.la2spaille.com'; // Desktop or mobile without protocol

        $head['twitter']['pseudo']  = '@la2spaille';
        $head['twitter']['creator'] = '@la2spaille';

        return $head;
    }

}