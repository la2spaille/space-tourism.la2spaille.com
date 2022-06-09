<?php
namespace Utils;
class Fetch
{
    public static function get($url): array
    {
        $curl = curl_init($url);

        curl_setopt_array($curl, [
            CURLOPT_CAINFO => $_SERVER["DOCUMENT_ROOT"] . DIRECTORY_SEPARATOR . 'cacert.pem',
            CURLOPT_RETURNTRANSFER => true
        ]);
        $response = curl_exec($curl);
        if ($response === false) {
            var_dump(curl_error($curl));
        }
        curl_close($curl);
        return json_decode($response, true);

    }
    public  static function shopify($data) : array {
        $curl = curl_init("https://la2spaille-dev.myshopify.com/api/2021-07/graphql.json");
        $headers = [];
        $headers[] = 'Content-Type: application/graphql';
        $headers[] = 'X-Shopify-Storefront-Access-Token: 8adca2b3bcb7814ca7562e7bf9433469';
        curl_setopt_array($curl,[
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => $headers
        ]);
        $response = curl_exec($curl);
        if ($response === false) {
            var_dump(curl_error($curl));
        }
        curl_close($curl);
        return json_decode($response, true);
    }
}
