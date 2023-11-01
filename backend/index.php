<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once __DIR__ . '/vendor/autoload.php';

// Conexão com banco de dados MySQL 
$pdo = new PDO("mysql:host=mysql;dbname=db", "db", "db");

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);
$app->post('/api/subscriber', function (Request $request, Response $response) use ($pdo) {

    $requestBody = $request->getBody();
    $formData = json_decode($requestBody, true);

    if ($formData === null) {
        $response->getBody()->write('Invalid JSON data.');
        return $response->withStatus(400);
    }

    $name = $formData['name'] ?? '';
    $email = strtolower(trim($formData['email'] ?? ''));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response->getBody()->write('Email inválido.');
        return $response->withStatus(409);
    }

    $sql = "SELECT COUNT(*) FROM newsletter WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        $response->getBody()->write('Email already registered.');
        return $response->withStatus(409); // HTTP 409 Conflict
    }

    $sql = "INSERT INTO newsletter (name, email) VALUES (:name, :email)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);

    if ($stmt->execute()) {

        // Todo: Fazer envio de email para o usuário cadastrado

        $response = $response->withStatus(201);
        $response->getBody()->write($pdo->lastInsertId());
        return $response;
    } else {
        $response->getBody()->write('Failed to save user data.');
        return $response->withStatus(500);
    }
});

$app->get('/api/subscribers', function (Request $request, Response $response) use ($pdo) {

    $sql = "SELECT * FROM newsletter";
    $stmt = $pdo->query($sql);

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($users)) {
        $response = $response->withHeader('Content-Type', 'application/json');
        $response->getBody()->write(json_encode($users));
        return $response;
    } else {
        $response->getBody()->write('No users found in the database.');
        return $response->withStatus(404);
    }
});

$app->post('/api/create', function (Request $request, Response $response) use ($pdo) {

    $requestBody = $request->getBody();
    $formData = json_decode($requestBody, true);

    if ($formData === null) {
        $response->getBody()->write('Invalid JSON data.');
        return $response->withStatus(400);
    }

    $name = $formData['name'] ?? '';
    $email = $formData['email'] ?? '';
    $password = password_hash($formData['password'] ?? '', PASSWORD_DEFAULT);

    $sql = "SELECT COUNT(*) FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        $response->getBody()->write('Email already registered.');
        return $response->withStatus(409);
    }

    $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);

    if ($stmt->execute()) {

        // Todo: Fazer envio de email para o usuário cadastrado

        $response = $response->withStatus(201);
        $response->getBody()->write('User data saved in the database.');
        return $response;
    } else {
        $response->getBody()->write('Failed to save user data.');
        return $response->withStatus(500);
    }
});

$app->post('/api/login', function (Request $request, Response $response) use ($pdo) {

    $requestBody = $request->getBody();
    $formData = json_decode($requestBody, true);

    if ($formData === null) {
        $response->getBody()->write('Invalid JSON data.');
        return $response->withStatus(400);
    }

    $email = $formData['email'] ?? '';
    $password = $formData['password'] ?? '';

    $sql = "SELECT password FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $row = $stmt->fetch();

    if ($row !== false) {

        $hash = $row['password'];

        if (password_verify($password, $hash)) {
            $response = $response->withStatus(200);
            $response->getBody()->write('Login successful.');
            return $response;
        } else {
            $response->getBody()->write('Invalid email or password.');
            return $response->withStatus(401);
        }
    } else {
        $response->getBody()->write('Invalid email or password.');
        return $response->withStatus(401);
    }
});

$app->get('/api/users', function (Request $request, Response $response) use ($pdo) {

    $sql = "SELECT * FROM users";
    $stmt = $pdo->query($sql);

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($users)) {

        foreach ($users as &$user) {
            $user['created'] = (new DateTime($user['created']))->format('d/m/Y H:i:s');
        }

        $response = $response->withHeader('Content-Type', 'application/json');
        $response->getBody()->write(json_encode($users));
        return $response;
    } else {
        $response->getBody()->write('No users found in the database.');
        return $response->withStatus(404);
    }
});

$app->post('/api/sendmail', function (Request $request, Response $response) use ($pdo) {
});

$app->run();
