<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 25px;
            border-radius: 8px;
            max-width: 500px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #2d89ef;
        }
        .footer {
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
<div class="container">
    <h2>Hello, {{ $userName }}!</h2>
    <p>Your One-Time Password (OTP) is:</p>
    <p class="otp">{{ $otp }}</p>
    <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
    <div class="footer">
        If you did not request this OTP, please ignore this email.
    </div>
</div>
</body>
</html>
