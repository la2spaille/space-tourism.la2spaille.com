<?php

namespace App\Controller\Page;

use App\Model\Data;
use \Engine\Controller\Controller;

class Destination extends Controller
{
    public function show () {

        /*------------------------------------
            DATA
        ------------------------------------*/

        $this->data = Data::get('destination');
        $i = 0;
        foreach($this->data as $data) {
            $this->media[$i] = $data['images']['png'];
            $i++;
            $this->media[$i] = $data['images']['webp'];
            $i++;

        }

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'Space Tourism — Destination';
        $this->head['description'] = '';
        $this->head['opengraph'] = '/og/destination.jpg';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/
        return $this->render('destination');
    }

}