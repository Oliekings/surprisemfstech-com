<?php

namespace App\Filament\Resources\SmtpSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SmtpSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('host'),
                TextInput::make('port'),
                TextInput::make('encryption'),
                TextInput::make('username'),
                TextInput::make('password')
                    ->password(),
                TextInput::make('from_address'),
                TextInput::make('from_name'),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
