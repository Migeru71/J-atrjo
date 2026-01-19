<?php
// Permitir peticiones desde el frontend (React)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/**
 * API para obtener datos dinámicos de la página principal.
 * En una fase avanzada, estos datos vendrán de consultas SQL.
 */

$data = [
    "stats" => [
        "active_learners" => 500,
        "daily_phrase" => [
            "mazahua" => "Ki jñaa kjo",
            "spanish" => "Habla bien",
            "context" => "Se usa como saludo general."
        ]
    ],
    "courses_count" => 12,
    "latest_news" => "Nuevo curso interactivo disponible"
];

echo json_encode($data);
?>