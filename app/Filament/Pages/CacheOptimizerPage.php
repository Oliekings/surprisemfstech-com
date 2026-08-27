<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Illuminate\Support\Facades\Artisan;
use Filament\Notifications\Notification;

class CacheOptimizerPage extends Page
{
    protected string $view = 'filament.pages.cache-optimizer-page';

    protected function getHeaderActions(): array
    {
        return [
            Action::make('clearCache')
                ->label('Clear Cache')
                ->color('warning')
                ->icon('heroicon-o-trash')
                ->action(function () {
                    Artisan::call('cache:clear');
                    Notification::make()->title('Cache cleared')->success()->send();
                }),
            Action::make('clearRoute')
                ->label('Clear Routes')
                ->icon('heroicon-o-arrow-path')
                ->action(function () {
                    Artisan::call('route:clear');
                    Notification::make()->title('Routes cleared')->success()->send();
                }),
            Action::make('clearConfig')
                ->label('Clear Config')
                ->icon('heroicon-o-cog')
                ->action(function () {
                    Artisan::call('config:clear');
                    Notification::make()->title('Config cleared')->success()->send();
                }),
            Action::make('optimize')
                ->label('Optimize (Production)')
                ->color('success')
                ->icon('heroicon-o-bolt')
                ->action(function () {
                    Artisan::call('optimize');
                    Notification::make()->title('Application Optimized')->success()->send();
                })->requiresConfirmation(),
        ];
    }
}
