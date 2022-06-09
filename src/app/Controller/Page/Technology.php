<?php

namespace App\Controller\Page;

use \Engine\Controller\Controller;

class Technology extends Controller
{
    public function show () {

        /*------------------------------------
            MESSAGE
        ------------------------------------*/

        $this->data->msg = 'Technology';

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'Space Tourism — Technology';
        $this->head['description'] = '';
        $this->head['opengraph'] = '/og/technology.png?';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/
        $this->get_data('technology');
        $this->render('technology');
    }

}