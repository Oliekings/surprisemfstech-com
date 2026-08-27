<?php

namespace App\Filament\Resources\SeoMetas\Pages;

use App\Filament\Resources\SeoMetas\SeoMetaResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSeoMeta extends ViewRecord
{
    protected static string $resource = SeoMetaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
