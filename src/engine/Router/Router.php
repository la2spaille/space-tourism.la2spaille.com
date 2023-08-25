<?php

namespace Engine\Router;

use App\Controller\Auth\Auth;
use \App\Core\RedirectTo;

class Router
{
    private static $url;

    private static $page;
    private static $routes = [];

    private static $p404ControllerFn;

    public static function init()
    {
        self::$url = isset($_GET['url']) ? $_GET['url'] : '';

    }


    public static function getUrl()
    {
        return self::$url;
    }

    public static function getPage()
    {
        return self::$page;
    }

    public static function get($path, $controller, $page)
    {
        return self::add($path, $controller, $page, "GET");
    }

    public static function post($path, $controller, $page)
    {
        return self::add($path, $controller, $page, "POST");
    }

    private static function add($path, $controller, $page, $method)
    {
        $route = new Route($path, $controller, $page);
        self::$routes[$method][] = $route;
        return $route;
    }


    public static function p404($p404ControllerFn)
    {
        self::$p404ControllerFn = $p404ControllerFn;
    }

    public static function run()
    {
        foreach (self::$routes[$_SERVER["REQUEST_METHOD"]] as $route) {
            if ($route->match(self::$url)) {
                self::$page = $route->getPage();

                return $route->getController();
            }
        }

        // Page 404
        $controller = 'App\\Controller\\P404\\P404';
        $controller = new $controller(false);
        return call_user_func([$controller, self::$p404ControllerFn]);
    }

    /**
     * @return array
     */
    public static function getRoutes()
    {
        return self::$routes;
    }


}
