<?php

return [
    'paths' => ['api/*','sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://foryou.local', 'http://admin.foryou.local', 'http://super.foryou.local'],//ich glaube hier ist falsch nur main domain
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => ['*'],
    'max_age' => 0,
    'supports_credentials' => true,
];

