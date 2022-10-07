<?php

namespace App\Config;

class Head {

    public static function data () {
        $head['urlBase'] = 'https://spacetourism.myhostme.space/'; // Desktop version only with protocol
        $head['serverName'] = 'spacetourism.myhostme.space'; // Desktop or mobile without protocol

        $head['twitter']['pseudo']  = '@la2spaille';
        $head['twitter']['creator'] = '@la2spaille';

        return $head;
    }

}