<?php

namespace App\Controller\Page;

use \Engine\Controller\Controller;

class Crew extends Controller {

    public function show () {
        /*------------------------------------
                   MESSAGE
         ------------------------------------*/

        $this->data->msg = 'Crew';
        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'Space Tourism — Crew';
        $this->head['description'] = '';
        $this->head['opengraph'] = '/og/crew.png';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/
        $this->get_data('crew');
        $this->render('crew');
    }

}
