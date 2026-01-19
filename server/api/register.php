<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/db.php'; // Archivo de conexión que crearemos

// Obtener datos del cuerpo de la petición (JSON)
$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = $input['fullName'];
    $email = $input['email'];
    $roleName = $input['role'];
    $password = password_hash($input['password'], PASSWORD_BCRYPT); // Seguridad: Encriptación

    try {
        // 1. Obtener el ID del rol basado en el nombre (ej: 'student')
        $stmt = $pdo->prepare("SELECT role_id FROM roles WHERE name = ?");
        $stmt->execute([$roleName]);
        $roleId = $stmt->fetchColumn();

        // 2. Insertar el usuario
        $sql = "INSERT INTO users (full_name, email, password_hash, role_id) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$fullName, $email, $password, $roleId]);

        echo json_encode(["success" => true, "message" => "Usuario registrado"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
}
?>