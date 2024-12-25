<?php
require_once 'auth.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    $auth = new Auth();
    $result = $auth->login($username, $password);

    echo json_encode($result);
    exit;
}
?>