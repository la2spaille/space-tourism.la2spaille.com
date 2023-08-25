<?php

namespace App\Config;

use Engine\Router\Router;

class Route
{
    /*
     * For the same page, always put the most accurate routes first
     *
     * Examples of use :
     * 1. Call show function of P404Controller     →    Router::p404('show');
     * 2. Call show function of HomeController     →    Router::get('/', 'Home#show');
     * 3. WorkController with multiple option      →    Router::get('/work/:id/:name', 'WorkOne#show')->with('id', '[0-9]+')->with('name', '[a-z0-9-]+');
     * 4. WorkController with type option          →    Router::get('/work/:type', 'WorkAll#showWithType')->with('type', 'date|title|type');
     * 5. Call show function of WorkController     →    Router::get('/work', 'WorkAll#show');
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
        Router::init();

        Router::get('/', 'Home#show','Home');
        Router::get('/destination', 'Destination#show','Destination');
        Router::get('/crew', 'Crew#show','Crew');
        Router::get('/technology', 'Technology#show','Technology');

        Router::get('/brain', 'Brain#show', 'Brain');

        Router::p404('show');
        Router::run();

    }


}
