<?php

namespace Engine\Controller;

use App\Model\Data;
use JetBrains\PhpStorm\Pure;
use \stdClass;
use \App\Config\Head;
class Controller {
    private $callArgs;
    private $content;

    protected array $src;
    protected array $head;
    protected stdClass $data;

    #[Pure] public function __construct ($callArgs) {
        $this->callArgs = $callArgs;
        $this->data = new stdClass;
    }

    public function get_data($viewName) {
        $this->src = Data::get_data($viewName);
    }
    public function render ($viewName) {
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
            $xhr['title'] = $this->head['title'];
            $xhr['html'] = $this->content;
            print json_encode(array('xhr' => $xhr));
        } else {
            echo $this->get_content(ROOT . 'app/View/base/boilerplate.php');
        }
    }

    public function renderError () {
        header('HTTP/1.1 404 Not Found', 404, TRUE);

        // Content
        echo $this->get_content(ROOT . 'app/View/base/p404.php');
    }

    private function get_content ($fileName) : string {
        ob_start();
        require $fileName;
        return ob_get_clean();
    }
}