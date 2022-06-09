<?php

namespace Engine\Router;


class Route
{
    private $path;
    private $controller;
    private $callArgs = [];
    private $params = [];

    public function __construct($path, $controller)
    {
        $this->path = trim($path, '/');
        $this->controller = $controller;
    }

    public function with($param, $regex)
    {
        $this->params[$param] = str_replace('(', '(?:', $regex);
        return $this;
    }

    public function match($url)
    {
        $url = trim($url, '/');
        $path = preg_replace_callback('#:([\w]+)#', [$this, 'param_match'], $this->path);
        $path = str_replace('/', '\/', $path);
        $regex = '#^' . $path . '$#';
        if (!preg_match($regex, $url, $matches)) {
            return false;
        }
        array_shift($matches);
        $this->callArgs = $matches;
        return true;
    }

    public function get_controller()
    {
        $params = explode('#', $this->controller);
        $controller = 'App\\Controller\\Page\\' . $params[0];
        $controller = new $controller($this->callArgs);
        return call_user_func_array([$controller, $params[1]], $this->callArgs);

    }

    private function param_match($match)
    {
        if (isset($this->params[$match[1]])) {
            return '(' . $this->params[$match][1] . ')';
        }
        return '([^/]+)';

    }
}