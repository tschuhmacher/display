<?php

    //file extension of sended file
    $fileExtension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

    //extension for image
    $imageExtensions = ['jpg', 'jpeg', 'png'];

    //path where will be file uploaded
    $path = !in_array($fileExtension, $imageExtensions) ? __DIR__.'/../../public/models/' : __DIR__.'/../../public/img/';

    //allowed file extension for simple validation
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'json', 'gltf'];

    //validation of file size and type
    if (!in_array($fileExtension, $allowedExtensions)) {
        http_response_code(422);
    }

    //upload file to folder
    if (move_uploaded_file($_FILES['file']['tmp_name'], $path . $_FILES["file"]['name'])) {
        http_response_code(200);
    } else {
        http_response_code(503);
    }

?>