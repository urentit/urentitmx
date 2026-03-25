<?php

/**
 * The variables that should be updated are
 * $request
 * $rules
 * $message
 * $body
 */

require_once('formDependencies.php');

/**
 * Validate HTTP method to be POST
 */
validateMethod('post');

/**
 * Validate google recaptcha helps fight bots and in this case works as CSRF
 */
// validateRecaptcha( $inputName = 'g-recaptcha-response');

/**
 * Declare form fields excluding recaptcha
 */
$request = [
    'name',
    'last_name',
    'enterprise',
    'email',
    'phone',
    'vehicle',
    'how_meet_us',
];

foreach ($request as $key => $field) {
    $request[$field] = (isset($_POST[$field])) ? $_POST[$field] : null;
    unset($request[$key]);
}

/**
 * Trim, strip tags and sanitize all fields
 */
$request = cleanInput($request);

$rules = [
    'name'        => 'required|string',
    'last_name'   => 'required|string',
    'enterprise'  => 'required|string',
    'email'       => 'required|email',
    'phone'         => 'required|digits:10',
    'vehicle'     => 'required|string',
    'how_meet_us' => 'required|string',
];

$validator = $validationFactory->make($request, $rules, $messages, $customAttributes);

if($validator->fails()){
    $errors = $validator->errors();
    $responseErrors = [];
    foreach($errors->getMessages() as $key => $message) {
        $responseErrors[$key] = $message[0];
    }

    $response = [
        'status' => 'error',
        'message' => $errors->first(),
        'errors' => $errors->all(),
        'fields' => $errors->keys(),
        'details' => $responseErrors,
        'title'   => 'Hay un problema',
    ];

    respond($response, 400);
}

$date = new DateTime(null, new DateTimeZone('America/Mexico_City'));
$date = $date->format('Y-m-d H:i');

/**
 * Validate env variables for mail
 */

if (!validateMailConfig()) {
    $response = [
        'status' => 'error',
        'message' => 'Errores en la configuración del servicio de mail',
        'title'   => 'Hay un problema',
    ];

    respond($response, 500);
}

/**
 * Send email
 */
$message = new Swift_Message('Contacto URENTIT | '.$request['email']);
$message->setFrom(['noreply@urentit.mx' => 'URENTIT']);
$message->setTo($_ENV['MAIL_TO']);
$message->setReplyTo([$request['email'] => $request['name']]);

$body = '<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; background-color: #F0F9FF; color: #74787E; height: 100%; hyphens: auto; line-height: 1.4; margin: 0; -moz-hyphens: auto; -ms-word-break: break-all; width: 100% !important; -webkit-hyphens: auto; -webkit-text-size-adjust: none; word-break: break-word;">
    <style>
        @media  only screen and (max-width: 600px) {
            .inner-body {
                width: 100% !important;
            }

            .footer {
                width: 100% !important;
            }
        }

        @media  only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }
    </style>

    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; background-color: #F0F9FF; margin: 0; padding: 0; width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%;">
        <tr>
            <td align="center" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box;">
                <table class="content" width="100%" cellpadding="0" cellspacing="0" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; margin: 0; padding: 0; width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%;">
                    <tr>
    <td class="header" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; padding: 25px 0; text-align: center;">
        <a href="http://localhost" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #bbbfc3; font-size: 19px; font-weight: bold; text-decoration: none; text-shadow: 0 1px 0 white;">
            <img src="'.$_ENV['APP_URL'].'/img/logos/logo-urentit.png" alt="URENTIT" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; border: none; max-width: 150px;">
        </a>
    </td>
</tr>

                    <!-- Email Body -->
                    <tr>
                        <td class="body" width="100%" cellpadding="0" cellspacing="0" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; background-color: #FFFFFF; border-bottom: 1px solid #EDEFF2; border-top: 1px solid #EDEFF2; margin: 0; padding: 0; width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%;">
                            <table class="inner-body" align="center" width="570" cellpadding="0" cellspacing="0" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; background-color: #FFFFFF; margin: 0 auto; padding: 0; width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 570px;">
                                <!-- Body content -->
                                <tr>
                                    <td class="content-cell" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; padding: 35px;">
                                        <h1 style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #818282; font-size: 19px; font-weight: bold; margin-top: 0; text-align: left;">Hola administrador,</h1>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">Un visitante de URENTIT ha envíado un formulario de contacto, su información es la siguiente:</p>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">Nombre: '.$request["name"].'</p>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">Apellido: '.$request["last_name"].'</p>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">Empresa: '.$request["enterprise"].'</p>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">Correo electrónico corporativo: '.$request["email"].'</p>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">Teléfono: '.$request["phone"].'</p>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">Vehículo de interés: '.$request["vehicle"].'</p>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">¿Cómo te enteraste de nosotros?: '.$request["how_meet_us"].'</p>
<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">Saludos,<br>URENTIT</p>


                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
    <td style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box;">
        <table class="footer" align="center" width="570" cellpadding="0" cellspacing="0" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; margin: 0 auto; padding: 0; text-align: center; width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 570px;">
            <tr>
                <td class="content-cell" align="center" style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; padding: 35px;">
                    <p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; line-height: 1.5em; margin-top: 0; color: #AEAEAE; font-size: 12px; text-align: center;">© '.date('Y').' URENTIT. Todos los derechos reservados.</p>
                </td>
            </tr>
        </table>
    </td>
</tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>';

// // -- Preview email
// echo $body;
// exit();
// // -- End preview email

// Set the body
$message->setBody($body, 'text/html');
$mailer->send($message);

$response = [
    'status' => 'success',
    'message' => 'Tu mensaje ha sido enviado correctamente.',
    'title'   => 'Completado',
];

respond($response, 200);
