<?php

namespace App\Config;

use \Engine\Router\Router;

class Route
{
    /*
     * For the same page, always put the most accurate routes first
     *
     * Examples of use :
     * 1. Call show function of P404Controller     →    $router->p404('show');
     * 2. Call show function of HomeController     →    $router->get('/', 'Home#show');
     * 3. WorkController with multiple option      →    $router->get('/work/:id/:name', 'WorkOne#show')->with('id', '[0-9]+')->with('name', '[a-z0-9-]+');
     * 4. WorkController with type option          →    $router->get('/work/:type', 'WorkAll#showWithType')->with('type', 'date|title|type');
     * 5. Call show function of WorkController     →    $router->get('/work', 'WorkAll#show');
     *
     * Regex examples of optional with :
     * 1. [0-9]+
     * 2. [a-z]+
     * 3. [a-z-]+
     * 4. [a-z0-9-]+
     * 5. date|title|type
     */

    public static function init()
    {
        $router = new Router();

        $router->get('/', 'Home#show');
        $router->get('/destination', 'Destination#show');
        $router->get('/crew', 'Crew#show');
        $router->get('/technology', 'Technology#show');

        $router->p404('show');
        $router->run();

    }

    public static function get_routes()
    {
        return [
            "/" => [
                "path" => "/",
                "title" => "Space Tourism — Home",
                "view" => "home",
            ],
            "/destination" => [
                "path" => "/destination",
                "title" => "Space Tourism — Destination",
                "view" => "destination",
                "model" => "destination"
            ],
            "/crew" => [
                "path" => "/crew",
                "title" => "Space Tourism — Crew",
                "view" => "crew",
                "model" => "crew"
            ],
            "/technology" => [
                "path" => "/technology",
                "title" => "Space Tourism — Technology",
                "view" => "technology",
                "model" => "technology"
            ]
        ];
    }

}
