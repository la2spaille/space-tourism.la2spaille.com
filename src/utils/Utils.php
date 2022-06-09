<?php
namespace Utils;

class Utils
{
    public function pre_var_dump($var_dump) {
        echo "<pre>";
        var_dump($var_dump);
        echo "</pre>";
}
}