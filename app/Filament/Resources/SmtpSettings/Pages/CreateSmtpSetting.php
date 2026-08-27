<?php

namespace App\Filament\Resources\SmtpSettings\Pages;

use App\Filament\Resources\SmtpSettings\SmtpSettingResource;
use Filament\Resources\Pages\CreateRecord;

class CreateSmtpSetting extends CreateRecord
{
    protected static string $resource = SmtpSettingResource::class;
}
