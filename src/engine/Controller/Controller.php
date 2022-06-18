<?php

namespace Engine\Controller;

use App\Model\Data;
use JetBrains\PhpStorm\Pure;
use \stdClass;
use \App\Config\Head;
use App\Config\Route;

class Controller
{
    protected array $src;
    protected array $head;
    protected stdClass $data;
    private $callArgs;
    private $content;

    #[Pure] public function __construct($callArgs)
    {
        $this->callArgs = $callArgs;
        $this->data = new stdClass;
    }

    public function get_data($viewName)
    {
        $this->src = Data::get_data($viewName);
    }

    public function render($viewName)
    {
        // Head
        $this->head += Head::data();

        // Head url
        $urlPath = $_SERVER['REQUEST_URI'] === '/' ? '' : $_SERVER['REQUEST_URI'];
        $this->head['url'] = $this->head['urlBase'] . $urlPath;

        // Head robots
        if ($_SERVER['SERVER_NAME'] === $this->head['serverName'] && $this->head['allow-robots']) {
            $this->head['robots'] = 'all';
        } else {
            $this->head['robots'] = 'noindex, nofollow';
        }

        // Content
        $this->content = $this->get_content(ROOT . 'app/View/page/' . $viewName . '.php');
        if (isset($_GET['xhr'])) {
            $xhr['body'] = $this->content;
            $routes = Route::get_routes();
            foreach ($routes as $route) {
                $xhr['routes'][$route['path']] = $route['view'];
                $xhr['cache'][$route['path']]['tile'] = $route['title'] ;
                if(isset($route['model'])) {
                    $this->get_data($route['model']);
                }
                $xhr['cache'][$route['path']]['html'] =  $this->get_content(ROOT . 'app/View/page/' . $route['view'] . '.php');
            }
            print json_encode($xhr);
        } else {
            echo $this->get_content(ROOT . 'app/View/base/boilerplate.php');
        }
    }

    private function get_content($url): string
    {
        ob_start();
        require $url;
        return ob_get_clean();
    }

    public function renderError()
    {
        header('HTTP/1.1 404 Not Found', 404, TRUE);
        echo $this->get_content(ROOT . 'app/View/base/p404.php');
    }
}