<?php

namespace App\Filament\Resources\SeoMetas\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SeoMetaInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('slug'),
                TextEntry::make('title')
                    ->placeholder('-'),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('og_title')
                    ->placeholder('-'),
                TextEntry::make('og_description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                ImageEntry::make('og_image')
                    ->placeholder('-'),
                TextEntry::make('twitter_title')
                    ->placeholder('-'),
                TextEntry::make('twitter_description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                ImageEntry::make('twitter_image')
                    ->placeholder('-'),
                TextEntry::make('canonical_url')
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
