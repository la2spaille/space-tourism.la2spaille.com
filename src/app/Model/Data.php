<?php

namespace App\Model;

use \Engine\Model\Json;

class Data
{
    public static function get_data($viewName)
    {
        $data = Json::fetch_local("data.json");
        return $data[$viewName];
    }
}