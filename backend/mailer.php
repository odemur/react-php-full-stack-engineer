<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';


function sendMail($name, $email, $subject, $message) {
    $mail = new PHPMailer(true);


try {
$mail->isSMTP();
$mail->Host = 'sandbox.smtp.mailtrap.io';
$mail->SMTPAuth = true;
$mail->Port = 2525;
$mail->Username = 'f9dee3484700dd';
$mail->Password = '8d434a4efd3513';

$mail->setFrom('dev@odemur.com.br', 'Dev Company');
$mail->addAddress($mail, $name);
$mail->addReplyTo('dev@odemur.com.br', 'Reply-to Dev Company');

$mail->isHTML(true);
$mail->Subject = $subject;
$mail->Body = $message;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Error: ', $mail->ErrorInfo;
}

}