<?php

    // get posted data
    $data = file_get_contents("php://input");

	$decodedData = json_decode($data);
	print_r($decodedData);
    if (
        !empty($decodedData)
        && property_exists($decodedData, 'content') && !empty($decodedData->content)
        && property_exists($decodedData, 'name') && !empty($decodedData->name)
    ) {
		file_put_contents(
            __DIR__.'/' . $decodedData->name,
            json_encode($decodedData->content)
		);

		echo __DIR__.'/' . $decodedData->name;

        http_response_code(200);
    } else {
        http_response_code(503);
    }
