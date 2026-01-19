<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// 1. Recibir el correo del frontend
$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $email) {
    // Aquí iría la lógica para guardar en una tabla 'newsletter_subscribers'
    // O simplemente enviar un correo de bienvenida.

    echo json_encode([
        "status" => "success",
        "message" => "¡Gracias! Te hemos suscrito exitosamente con: " . $email
    ]);
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Correo inválido."]);
}
?>