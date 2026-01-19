<?php
// Configuración de cabeceras para permitir peticiones desde React (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Manejo de peticiones preflight (necesario para navegadores modernos)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Leer el flujo de entrada (input stream)
$json_data = file_get_contents("php://input");

// 2. Decodificar el JSON a un arreglo asociativo de PHP
$data = json_decode($json_data, true);

// 3. Simular lógica de negocio
if ($data && isset($data['email'])) {
    // Simulamos una respuesta de éxito
    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "¡Hola " . $data['fullName'] . "! Recibimos tu registro como " . $data['role'],
        "debug_info" => [
            "email_recibido" => $data['email'],
            "timestamp" => date("Y-m-d H:i:s")
        ]
    ]);
} else {
    // Respuesta en caso de datos incompletos
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Datos de formulario incompletos o mal formados."
    ]);
}
?>