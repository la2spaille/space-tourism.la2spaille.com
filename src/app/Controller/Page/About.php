<?php

namespace App\Controller\Page;

use \Engine\Controller\Controller;

class About extends Controller {

    public function show () {

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'la2spaille — About';
        $this->head['description'] = 'wooooow';
//        $this->head['opengraph'] = '/og/1200-630.png?' . VERSION;

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/

        $this->render('about');
    }

}
