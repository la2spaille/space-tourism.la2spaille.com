<?php

namespace Engine\Model;

class Rest
{
    private $rootUrl;

    public function __construct($rootUrl)
    {
        $this->rootUrl = $rootUrl;
    }

    public function request($endpoint,$method,$header,$curlopt =[]) {
        $url = $this->rootUrl . $endpoint;
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT , 30);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST , $method);
        curl_setopt($curl, CURLOPT_CAINFO, ROOT . "engine/Model/cacert.pem");
        curl_setopt($curl, CURLOPT_HTTPHEADER , $header);
        curl_setopt($curl, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1);
        foreach($curlopt as $opt) {
            curl_setopt($curl, $opt['option'] , $opt['value']);
        }

        $response = curl_exec($curl);
        if (curl_error($curl)) {
            return (curl_error($curl));
        }
        curl_close($curl);
        return json_decode($response,true);

    }

    public function get($endpoint = "", $header = ["Content-Type: application/json"] )
    {
        return $this->request($endpoint,'GET',$header);
       
    }

    public function post($endpoint="",$header=[],$curlopt=[])
    {
        return $this->request($endpoint,'POST',$header,$curlopt);
    }
}






















