<?php

namespace Engine\Router;


class Route
{
    private $path;
    private $controller;
    private $page;
    private $callArgs = [];
    private $params = [];

    public function __construct($path, $controller, $page)
    {
        $this->path = trim($path, '/');
        $this->controller = $controller;
        $this->page = $page;
    }

    public function with($param, $regex)
    {
        $this->params[$param] = str_replace('(', '(?:', $regex);
        return $this;
    }

    public function match($url)
    {
        $url = trim($url, '/');
        $path = preg_replace_callback('#:([\w]+)#', [$this, 'paramMatch'], $this->path);
        $path = str_replace('/', '\/', $path);
        $regex = '#^' . $path . '$#';
        if (!preg_match($regex, $url, $matches)) {
            return false;
        }
        array_shift($matches);
        $this->callArgs = $matches;
        return true;
    }

    public function getPage()
    {
        return $this->page;
    }

    public function getController()
    {
        $params = explode('#', $this->controller);
        $controller = 'App\\Controller\\Page\\' . $params[0];
        $controller = new $controller($this->callArgs);
        return call_user_func_array([$controller, $params[1]], $this->callArgs);

    }

    public function getPath()
    {
        return "/" . $this->path;
    }

    private function paramMatch($match)
    {
        if (isset($this->params[$match[1]])) {
            return '(' . $this->params[$match[1]] . ')';
        }
        return '([^/]+)';

    }

}