<?php

namespace App\Filament\Resources\SmtpSettings\Pages;

use App\Filament\Resources\SmtpSettings\SmtpSettingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSmtpSettings extends ListRecords
{
    protected static string $resource = SmtpSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
