<?php

namespace App\Controller\Page;

use App\Model\Data;
use \Engine\Controller\Controller;

class Technology extends Controller
{
    public function show () {

        /*------------------------------------
            MESSAGE
        ------------------------------------*/

        $this->data = Data::get('technology');
        $i = 0;
        foreach($this->data as $data) {
            
            $this->media[$i] = $data['images']['portrait'];
            $i++;
            $this->media[$i] = $data['images']['landscape'];
            $i++;

        }

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'Space Tourism — Technology';
        $this->head['description'] = '';
        $this->head['opengraph'] = '/og/technology.jpg';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/
        return $this->render('technology');
    }

}