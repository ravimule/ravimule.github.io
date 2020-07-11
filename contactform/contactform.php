<?php
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$to = 'ravimule91@gmail.com';

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= "Name: $name" . "\r\n";
$headers .= "From: $email" . "\r\n";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($message,70);

// send email
$result = mail($to, $subject, $msg, $headers);

if($result)
{
	echo "Thank You for Contacting Me. I will get back to you shortly.";
}
else
{
	echo "Something went wrong. Please try again!";
}
?>