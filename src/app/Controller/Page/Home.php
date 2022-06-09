<?php

namespace App\Controller\Page;

use \Engine\Controller\Controller;

class Home extends Controller {

    public function show () {

        /*------------------------------------
            MESSAGE
        ------------------------------------*/

        $this->data->msg = 'Home';

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'lab — UCL';
        $this->head['description'] = '';
//        $this->head['opengraph'] = '/og/1200-630.png?' . VERSION;

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/

        $this->render('home');
    }

}
