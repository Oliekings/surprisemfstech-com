<?php
// Temporary diagnostic & auto-fix script for Hostinger shared hosting
error_reporting(E_ALL);
ini_set('display_errors', '1');

header('Content-Type: text/plain');

echo "=== SURPRISE-MFS TECH DIAGNOSTIC TOOL ===\n";
echo "PHP Version: " . PHP_VERSION . "\n";
echo "Current Directory: " . __DIR__ . "\n";

// 1. Check .env file
echo "\n--- 1. ENV Check ---\n";
if (file_exists(__DIR__ . '/.env')) {
    echo ".env file EXISTS (" . filesize(__DIR__ . '/.env') . " bytes)\n";
    $envContent = file_get_contents(__DIR__ . '/.env');
    if (preg_match('/^APP_KEY=(.+)$/m', $envContent, $m)) {
        echo "APP_KEY is SET (" . substr($m[1], 0, 15) . "...)\n";
    } else {
        echo "WARNING: APP_KEY is MISSING in .env!\n";
    }
    if (preg_match('/^DB_CONNECTION=(.+)$/m', $envContent, $m)) {
        echo "DB_CONNECTION: " . trim($m[1]) . "\n";
    }
} else {
    echo "ERROR: .env file DOES NOT EXIST in " . __DIR__ . "\n";
}

// 2. Check Storage Permissions
echo "\n--- 2. Storage & Cache Permissions ---\n";
$dirs = [
    'storage',
    'storage/app',
    'storage/app/public',
    'storage/framework',
    'storage/framework/cache',
    'storage/framework/cache/data',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/logs',
    'bootstrap/cache',
];

foreach ($dirs as $d) {
    $full = __DIR__ . '/' . $d;
    if (!file_exists($full)) {
        echo "MISSING: $d (creating now...)\n";
        @mkdir($full, 0775, true);
    }
    $isWritable = is_writable($full);
    echo "$d: " . ($isWritable ? "WRITABLE (OK)" : "NOT WRITABLE (CHMOD NEEDED)") . "\n";
}

// 3. Vendor Structure Check
echo "\n--- 3. Vendor Structure Check ---\n";
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    echo "vendor/autoload.php: EXISTS\n";
} else {
    echo "vendor/autoload.php: MISSING\n";
}

if (file_exists(__DIR__ . '/vendor/composer/autoload_real.php')) {
    echo "vendor/composer/autoload_real.php: EXISTS (OK)\n";
} else {
    echo "vendor/composer/autoload_real.php: MISSING\n";
    
    // Check if vendor was extracted as vendor/vendor
    if (file_exists(__DIR__ . '/vendor/vendor/composer/autoload_real.php')) {
        echo "FOUND: vendor was nested inside vendor/vendor/! Moving files up...\n";
        function copyRecursive($src, $dst) {
            $dir = opendir($src);
            @mkdir($dst, 0775, true);
            while (false !== ($file = readdir($dir))) {
                if (($file != '.') && ($file != '..')) {
                    if (is_dir($src . '/' . $file)) {
                        copyRecursive($src . '/' . $file, $dst . '/' . $file);
                    } else {
                        copy($src . '/' . $file, $dst . '/' . $file);
                    }
                }
            }
            closedir($dir);
        }
        copyRecursive(__DIR__ . '/vendor/vendor', __DIR__ . '/vendor');
        echo "Move completed! Please refresh.\n";
    } else {
        // List what is inside vendor/
        if (is_dir(__DIR__ . '/vendor')) {
            echo "Contents of vendor/ directory:\n";
            $files = scandir(__DIR__ . '/vendor');
            foreach ($files as $f) {
                if ($f !== '.' && $f !== '..') {
                    echo "  - $f\n";
                }
            }
        }
    }
}

// 4. Test Laravel Boot
echo "\n--- 4. Laravel Boot Test ---\n";
try {
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        require __DIR__ . '/vendor/autoload.php';
        echo "Autoloader: OK\n";
        
        $app = require_once __DIR__ . '/bootstrap/app.php';
        echo "Bootstrap app: OK\n";
        
        $kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
        $kernel->bootstrap();
        echo "Laravel Core Booted: OK\n";
        
        echo "App Environment: " . app()->environment() . "\n";
        echo "Config APP_KEY: " . (config('app.key') ? "VALID" : "EMPTY") . "\n";
        
        // Test Database
        echo "\n--- 5. Database Connection Test ---\n";
        try {
            \Illuminate\Support\Facades\DB::connection()->getPdo();
            echo "Database Connection: SUCCESS (" . \Illuminate\Support\Facades\DB::connection()->getDatabaseName() . ")\n";
            
            $projectsCount = \App\Models\Project::count();
            echo "Projects in DB: " . $projectsCount . "\n";
            $settingsCount = \App\Models\Setting::count();
            echo "Settings in DB: " . $settingsCount . "\n";
        } catch (\Throwable $e) {
            echo "DATABASE ERROR: " . $e->getMessage() . "\n";
        }
    } else {
        echo "Skipping boot test: vendor/autoload.php missing.\n";
    }

} catch (\Throwable $e) {
    echo "BOOT ERROR: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . " (Line " . $e->getLine() . ")\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
}

echo "\n=== END OF DIAGNOSTIC ===\n";
