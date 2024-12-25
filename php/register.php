<?php
require_once 'auth.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $repeatPassword = trim($_POST['repeat_password'] ?? '');

    $auth = new Auth();
    $result = $auth->register($username, $password, $repeatPassword);

    echo json_encode($result);
    exit;
}
?>