<?php

namespace App\Providers;

use App\Support\Sanitizer\LegacyParser;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Symfony\Component\HtmlSanitizer\HtmlSanitizer;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->scoped(
            HtmlSanitizerInterface::class,
            fn (): HtmlSanitizer => new HtmlSanitizer(
                (new HtmlSanitizerConfig)
                    ->allowSafeElements()
                    ->allowRelativeLinks()
                    ->allowRelativeMedias()
                    ->allowAttribute('class', allowedElements: '*')
                    ->allowAttribute('data-color', allowedElements: '*')
                    ->allowAttribute('data-from-breakpoint', allowedElements: '*')
                    ->allowAttribute('data-type', allowedElements: '*')
                    ->allowAttribute('style', allowedElements: '*')
                    ->allowAttribute('width', allowedElements: 'img')
                    ->allowAttribute('height', allowedElements: 'img')
                    ->withMaxInputLength(500000),
                new LegacyParser()
            ),
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
