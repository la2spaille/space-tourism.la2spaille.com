<?php

namespace App\Config;

class Head {

    public static function data () {
        $head['urlBase'] = 'https://space-tourism.la2spaille.studio'; // Desktop version only with protocol
        $head['serverName'] = 'space-tourism.la2spaille.studio'; // Desktop or mobile without protocol

        $head['twitter']['pseudo']  = '@la2spaille';
        $head['twitter']['creator'] = '@la2spaille';

        return $head;
    }

}