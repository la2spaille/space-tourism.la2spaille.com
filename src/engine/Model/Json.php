<?php

namespace Engine\Model;

class Json
{
    public static function fetch_local($filename) {
        $data = file_get_contents(ROOT . 'public/' . $filename);
        return json_decode($data, true);
    }
}