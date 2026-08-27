<?php

namespace App\Filament\Resources\TeamMembers;

use App\Filament\Resources\TeamMembers\Pages\ManageTeamMembers;
use App\Models\TeamMember;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;

class TeamMemberResource extends Resource
{
    protected static ?string $model = TeamMember::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(['default' => 1, 'lg' => 3])->schema([
                    // Main Content Column
                    Grid::make()->schema([
                        Section::make('Profile Identity')
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->columnSpan(1),
                                TextInput::make('role')
                                    ->required()
                                    ->maxLength(255)
                                    ->columnSpan(1),
                                Textarea::make('bio')
                                    ->rows(4)
                                    ->columnSpanFull(),
                            ])->columns(2),

                        Section::make('Social Connectivity')
                            ->schema([
                                Repeater::make('social_links')
                                    ->label('Links')
                                    ->schema([
                                        TextInput::make('platform')
                                            ->placeholder('e.g. LinkedIn')
                                            ->required(),
                                        TextInput::make('url')
                                            ->placeholder('https://...')
                                            ->url()
                                            ->required(),
                                    ])
                                    ->columns(2)
                                    ->cloneable()
                                    ->collapsible(),
                            ]),
                    ])->columnSpan(['lg' => 2]),

                    // Sidebar Configuration
                    Grid::make()->schema([
                        Section::make('Avatar')
                            ->schema([
                                FileUpload::make('avatar_path')
                                    ->label('Profile Image')
                                    ->image()
                                    ->imageEditor()
                                    ->directory('team-avatars')
                                    ->disk('public')
                                    ->hiddenLabel(),
                            ]),

                        Section::make('Capabilities')
                            ->schema([
                                Select::make('skills')
                                    ->relationship('skills', 'name')
                                    ->multiple()
                                    ->preload()
                                    ->searchable(),
                            ]),
                    ])->columnSpan(['lg' => 1]),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\ImageColumn::make('avatar_path')
                    ->circular(),
                \Filament\Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('role')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageTeamMembers::route('/'),
        ];
    }
}
