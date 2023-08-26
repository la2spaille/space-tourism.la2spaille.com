<?php

/*

// ------------------------------------

function exception_error_handler ($severity, $message, $file, $line) {
   if (!(error_reporting(E_ALL) & $severity)) {
        // Ce code d'erreur n'est pas inclus dans error_reporting()
        return;
    }
    throw new ErrorException($message, 0, $severity, $file, $line);
}
set_error_handler("exception_error_handler");

// ------------------------------------

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ------------------------------------

var_dump(realpath(dirname(getcwd())));
exit();

// ------------------------------------

echo '<pre>';
phpinfo();
echo '</pre>';
exit();

*/

$IS_PROD =  true;
define('IS_PROD',$IS_PROD);
const VERSION = 1.2;

$root = substr($_SERVER['DOCUMENT_ROOT'], 0, -6);

require $root . 'app/Core/Constant.php';
App\Core\Constant::init();

require ROOT . 'app/Core/App.php';
App\Core\App::init();

function betterVarDump( $var) {
    echo '<pre>';
    var_dump($var);
    echo '</pre>';
    die();
}