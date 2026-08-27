<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(12)->schema([
                    // Main Content Column (Left - 8/12)
                    Section::make('Project Content')
                        ->schema([
                            Section::make('Core Information')
                                ->schema([
                                    TextInput::make('title')
                                        ->required()
                                        ->maxLength(255)
                                        ->live(onBlur: true)
                                        ->afterStateUpdated(fn (string $operation, $state, $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),

                                    TextInput::make('slug')
                                        ->disabled()
                                        ->dehydrated()
                                        ->required()
                                        ->maxLength(255)
                                        ->unique(\App\Models\Project::class, 'slug', ignoreRecord: true),

                                    Textarea::make('summary')
                                        ->rows(3)
                                        ->helperText('A brief overview for the portfolio grid.')
                                        ->columnSpanFull(),

                                    RichEditor::make('detailed_description')
                                        ->label('Full Case Study')
                                        ->toolbarButtons([
                                            'attachFiles', 'blockquote', 'bold', 'bulletList', 
                                            'codeBlock', 'h2', 'h3', 'italic', 'link', 'orderedList', 
                                            'redo', 'strike', 'underline', 'undo',
                                        ])
                                        ->columnSpanFull(),
                                ])->columns(2),

                            Section::make('Process & Execution')
                                ->description('Step-by-step breakdown of how the project was built.')
                                ->schema([
                                    Repeater::make('process')
                                        ->label('Methodology Steps')
                                        ->schema([
                                            Grid::make(4)->schema([
                                                TextInput::make('step')
                                                    ->label('Step Num')
                                                    ->placeholder('01')
                                                    ->required()
                                                    ->columnSpan(1),
                                                TextInput::make('title')
                                                    ->required()
                                                    ->columnSpan(3),
                                            ]),
                                            Textarea::make('description')
                                                ->required()
                                                ->rows(2),
                                        ])
                                        ->cloneable()
                                        ->collapsible()
                                        ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
                                ]),
                        ])->columnSpan(8),

                    // Sidebar (Right - 4/12)
                    Grid::make(1)->schema([
                        Section::make('Media Assets')
                            ->schema([
                                FileUpload::make('featured_image')
                                    ->image()
                                    ->imageEditor()
                                    ->directory('projects/featured')
                                    ->disk('public')
                                    ->helperText('Main image for the portfolio grid.'),
                                    
                                FileUpload::make('gallery')
                                    ->multiple()
                                    ->image()
                                    ->imageEditor()
                                    ->reorderable()
                                    ->directory('projects/gallery')
                                    ->disk('public')
                                    ->helperText('Additional images for the case study.'),
                            ]),

                        Section::make('Discovery & Team')
                            ->schema([
                                TextInput::make('live_url')
                                    ->label('Live Project URL')
                                    ->url()
                                    ->placeholder('https://...')
                                    ->prefixIcon('heroicon-o-link'),
                                    
                                TextInput::make('client_name')
                                    ->maxLength(255)
                                    ->prefixIcon('heroicon-o-briefcase'),

                                DatePicker::make('completion_date')
                                    ->displayFormat('F j, Y'),

                                Select::make('teamMembers')
                                    ->relationship('teamMembers', 'name')
                                    ->multiple()
                                    ->preload()
                                    ->searchable(),
                            ]),
                    ])->columnSpan(4),
                ]),
            ]);
    }
}
