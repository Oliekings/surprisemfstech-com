<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/vendor/autoload.php';

try {
    // Bootstrap Laravel and handle the request...
    /** @var Application $app */
    $app = require_once __DIR__.'/bootstrap/app.php';

    // Set public path to the current directory for Vite and other assets
    $app->usePublicPath(__DIR__);

    $app->handleRequest(Request::capture());
} catch (\Throwable $e) {
    // If a bootstrap error occurs, log and output safely
    $logDir = __DIR__ . '/storage/logs';
    if (!file_exists($logDir)) {
        @mkdir($logDir, 0775, true);
    }
    $logMsg = date('[Y-m-d H:i:s] ') . $e->getMessage() . "\n" . $e->getTraceAsString() . "\n";
    @file_put_contents($logDir . '/laravel.log', $logMsg, FILE_APPEND);
    
    http_response_code(500);
    $debug = false;
    if (file_exists(__DIR__ . '/.env')) {
        $env = file_get_contents(__DIR__ . '/.env');
        if (preg_match('/^APP_DEBUG=true/m', $env)) {
            $debug = true;
        }
    }
    
    if ($debug) {
        header('Content-Type: text/html; charset=utf-8');
        echo "<h1>Server Error (Debug Mode)</h1><p><strong>" . htmlspecialchars($e->getMessage()) . "</strong></p><pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
    } else {
        header('Content-Type: text/html; charset=utf-8');
        echo "<!DOCTYPE html><html><head><title>500 Internal Server Error</title><style>body{background:#000;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}h1{color:#f59e0b;font-size:2rem;}p{color:#a1a1aa;}</style></head><body><div style='text-align:center;'><h1>500 · Server Error</h1><p>The application encountered an issue starting up. Please check your database settings or file permissions.</p></div></body></html>";
    }
}
