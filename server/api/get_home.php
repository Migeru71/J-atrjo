<?php
// server/api/get_home.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/**
 * Provee los datos dinámicos para la Landing Page.
 * En producción, estos valores se extraerán de MySQL mediante SELECT COUNT(*).
 */
$homeData = [
    "hero" => [
        "badge" => "Nuevo curso interactivo disponible",
        "student_count" => "500+"
    ],
    "daily_phrase" => [
        "phrase" => "Ki jñaa kjo",
        "translation" => "Habla bien",
        "context" => "Saludo general y cortesía."
    ],
    "status" => "success"
];

echo json_encode($homeData);
?>