<?php

namespace App\Filament\Resources\SmtpSettings\Pages;

use App\Filament\Resources\SmtpSettings\SmtpSettingResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditSmtpSetting extends EditRecord
{
    protected static string $resource = SmtpSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
