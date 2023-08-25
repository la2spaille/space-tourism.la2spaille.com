<?php

namespace App\Model;

use \Engine\Model\Json;

class Data
{
    public static function get($viewName)
    {
        $data = Json::fetchLocal("data.json");
        return $data[$viewName];
    }
}