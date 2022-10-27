<?php
// require_once('../../../wp-load.php');


// $leads_email = boffeer_explode_textarea(carbon_get_theme_option('leads_emails'));
$leads_email = ['boffeechane@gmail.com', 'hastechsu@gmail.com'];

// $to = 'boffeechane@gmail.com';
$email_from = 'info@haswater.com';



$ff = ($_FILES['file']);
if (!empty($_FILES['file']['tmp_name'])) {
	$filepath = $_FILES['file']['tmp_name'];
	$filename = $_FILES['file']['name'];
} else {
	$filepath = '';
	$filename = '';
}


foreach ($_POST as $key => $value) {
	if (($key != 'file') && ($value != "") && ($key != "project_name") && ($key != "form_subject")  && ($key != "sendMail")) {
		$customkey = $key;
		if ($key == 'user_name') {
			$customkey = "İsim";
		} elseif ($key == 'user_tel') {
			$customkey = 'Telefon';
		} elseif ($key == 'user_email') {
			$customkey = 'E-mail:';
		} elseif ($key == 'user_city') {
			$customkey = 'Город:';
		} elseif ($key == 'user_message') {
			$customkey = 'Message';
		} elseif ($key == 'formname') {
			$customkey = 'Forme';
		} elseif ($key == 'page') {
			$customkey = 'Page';
		} elseif ($key == 'user_company') {
			$customkey = 'Компания:';
		}


		$body .= "$customkey \r\n" . $value . "\r\n\r\n";
	}
}



$subject = 'New Lead';
$boundary = "--" . md5(uniqid(time())); // генерируем разделитель
$headers = "From: " . $email_from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";
$multipart = "--" . $boundary . "\r\n";
$multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
$multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

$body = $body . "\r\n\r\n";


$multipart .= $body;
$file = '';
if (!empty($filepath)) {
	$fp = fopen($filepath, "r");
	if ($fp) {
		$content = fread($fp, filesize($filepath));
		fclose($fp);
		$file .= "--" . $boundary . "\r\n";
		$file .= "Content-Type: application/octet-stream\r\n";
		$file .= "Content-Transfer-Encoding: base64\r\n";
		$file .= "Content-Disposition: attachment; filename=\"" . $filename . "\"\r\n\r\n";
		$file .= chunk_split(base64_encode($content)) . "\r\n";
	}
}

$multipart .= $file . "--" . $boundary . "--\r\n";

foreach ($leads_email as $email) {
	mail($email, $subject, $multipart, $headers);
}

echo json_encode(array('ok' => 'ok', 'leads' => json_encode($leads_email)));
