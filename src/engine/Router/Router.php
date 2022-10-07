<?php

namespace Engine\Router;
class Router
{
    private  $url;
    private array $routes = [];
    private $p404ControllerFn;

    public function __construct() {
        $this->url = $_GET['url'] ?? '';

    }

    public function get($path, $controller): Route
    {
        return $this->add($path, $controller, "GET");
    }
    public function post ($path, $controller)
    {
        return $this->add($path, $controller, "POST");
    }
    public function p404 ($p404ControllerFn) {
        $this->p404ControllerFn = $p404ControllerFn;
    }
    private function add($path, $controller, $method) : Route
    {
        $route = new Route($path, $controller);
        $this->routes["$method"][] = $route;

        return $route;
    }

    public function run()
    {
        foreach ($this->routes[$_SERVER["REQUEST_METHOD"]] as $route) {
            if ($route->match($this->url)) {
                return $route->get_controller();
            }
        }

        // Page 404
        $controller = 'App\\Controller\\P404\\P404';
        $controller = new $controller(false);
        return call_user_func([$controller, $this->p404ControllerFn]);
    }

}
