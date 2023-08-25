<?php

namespace App\Controller\Page;

use \Engine\Controller\Controller;

class Home extends Controller {

    public function show () {

        /*------------------------------------
            DATA
        ------------------------------------*/

        $this->data->msg = 'Home';
        
        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'Space Tourism — Home';
        $this->head['description'] = '';
        $this->head['opengraph'] = '/og/home.jpg';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/

        return $this->render('home');
    }

}
