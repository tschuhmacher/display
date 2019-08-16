<?php

    // required headers
    header("Access-Control-Allow-Origin: *"); //it should be changed
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header('Access-Control-Max-Age: 86400');
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $request = $_SERVER["REQUEST_URI"];

    switch ($request) {
        case '/save' :
            require __DIR__ . '/api/createConfig.php';
            break;
        case '/upload' :
            require __DIR__ . '/api/uploadFile.php';
            break;
        default:
            break;
    }

?>