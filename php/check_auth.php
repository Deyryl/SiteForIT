<?php
require_once 'auth.php';

header('Content-Type: application/json');

$auth = new Auth();
$isLoggedIn = $auth->isLoggedIn();

echo json_encode([
    'isLoggedIn' => $isLoggedIn,
    'username' => $_SESSION['username'] ?? null
]);
?>
