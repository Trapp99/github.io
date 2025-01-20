<!-- filepath: /d:/Programmazione/Sites/SitoPersonaleNew/project/mt-solutions/send_email.php -->
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "andreatrapani898@gmail.com"; // Indirizzo email predefinito
    $from = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $from . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $body = "<html><body>";
    $body .= "<p><strong>Email:</strong> " . htmlspecialchars($from) . "</p>";
    $body .= "<p><strong>Oggetto:</strong> " . htmlspecialchars($subject) . "</p>";
    $body .= "<p><strong>Messaggio:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";
    $body .= "</body></html>";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Messaggio inviato con successo!'); window.location.href='message.html';</script>";
    } else {
        echo "<script>alert('Errore nell\'invio del messaggio.'); window.location.href='message.html';</script>";
    }
} else {
    echo "<script>alert('Richiesta non valida.'); window.location.href='message.html';</script>";
}
?>