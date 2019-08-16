<?php

    // get posted data
    $data = file_get_contents("php://input");

	$decodedData = json_decode($data);
    if (
        !empty($decodedData)
        && property_exists($decodedData, 'content') && !empty($decodedData->content)
        && property_exists($decodedData, 'name') && !empty($decodedData->name)
    ) {

    if($_SERVER[SERVER_NAME] === 'localhost'){
        file_put_contents(
            __DIR__.'/../../public/' . $decodedData->name,
            json_encode($decodedData->content)
        );
    }else {
        file_put_contents(
            __DIR__.'/' . $decodedData->name,
            json_encode($decodedData->content)
        );
    }

        http_response_code(200);
    } else {
        http_response_code(503);
    }
