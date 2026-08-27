<?php

namespace App\Filament\Resources\SmtpSettings;

use App\Filament\Resources\SmtpSettings\Pages\CreateSmtpSetting;
use App\Filament\Resources\SmtpSettings\Pages\EditSmtpSetting;
use App\Filament\Resources\SmtpSettings\Pages\ListSmtpSettings;
use App\Filament\Resources\SmtpSettings\Pages\ViewSmtpSetting;
use App\Filament\Resources\SmtpSettings\Schemas\SmtpSettingForm;
use App\Filament\Resources\SmtpSettings\Schemas\SmtpSettingInfolist;
use App\Filament\Resources\SmtpSettings\Tables\SmtpSettingsTable;
use App\Models\SmtpSetting;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SmtpSettingResource extends Resource
{
    protected static ?string $model = SmtpSetting::class;

    public static function form(Schema $schema): Schema
    {
        return SmtpSettingForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SmtpSettingInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SmtpSettingsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSmtpSettings::route('/'),
            'create' => CreateSmtpSetting::route('/create'),
            'view' => ViewSmtpSetting::route('/{record}'),
            'edit' => EditSmtpSetting::route('/{record}/edit'),
        ];
    }
}
