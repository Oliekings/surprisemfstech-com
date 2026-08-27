<?php

namespace App\Filament\Resources\SmtpSettings\Pages;

use App\Filament\Resources\SmtpSettings\SmtpSettingResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSmtpSetting extends ViewRecord
{
    protected static string $resource = SmtpSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
