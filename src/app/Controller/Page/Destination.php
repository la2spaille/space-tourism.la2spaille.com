<?php

namespace App\Controller\Page;

use \Engine\Controller\Controller;

class Destination extends Controller
{
    public function show () {

        /*------------------------------------
            MESSAGE
        ------------------------------------*/

        $this->data->msg = 'Destination';

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'Space Tourism — Destination';
        $this->head['description'] = '';
        $this->head['opengraph'] = '/og/destination.png?';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/
        $this->get_data('destination');
        $this->render('destination');
    }

}