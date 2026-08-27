<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use BackedEnum;

class ManageGlobalSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cog-8-tooth';
    protected static ?string $navigationLabel = 'Site Settings';
    protected static ?string $title = 'Site Settings';
    protected static ?int $navigationSort = 100;
    protected string $view = 'filament.pages.manage-global-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = Setting::pluck('value', 'key')->toArray();
        $this->form->fill($settings);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                Tabs::make('Settings')
                    ->tabs([
                        Tab::make('General & Branding')
                            ->icon('heroicon-o-building-office')
                            ->schema([
                                Section::make('Brand Identity')
                                    ->description('Your studio name and primary contact information.')
                                    ->schema([
                                        TextInput::make('site_name')
                                            ->label('Studio Name')
                                            ->placeholder('Surprise-MFs Tech')
                                            ->required(),
                                        TextInput::make('contact_email')
                                            ->label('Contact Email')
                                            ->email()
                                            ->placeholder('surprisemfstech@gmail.com'),
                                    ])
                                    ->columns(2),
                            ]),

                        Tab::make('Homepage')
                            ->icon('heroicon-o-home')
                            ->schema([
                                Section::make('Hero Section')
                                    ->description('The main headline and introduction visitors see first.')
                                    ->schema([
                                        TextInput::make('hero_text')
                                            ->label('Hero Headline')
                                            ->placeholder('We build digital experiences that defy expectations.')
                                            ->required()
                                            ->columnSpanFull(),
                                        Textarea::make('about_text')
                                            ->label('About / Sub-Headline')
                                            ->placeholder('A collective of developers, designers...')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Tab::make('Social Links')
                            ->icon('heroicon-o-share')
                            ->schema([
                                Section::make('Social Media Profiles')
                                    ->description('Your public-facing social links displayed in the footer.')
                                    ->schema([
                                        TextInput::make('social_instagram')
                                            ->label('Instagram')
                                            ->url()
                                            ->placeholder('https://instagram.com/...'),
                                        TextInput::make('social_twitter')
                                            ->label('X / Twitter')
                                            ->url()
                                            ->placeholder('https://x.com/...'),
                                        TextInput::make('social_linkedin')
                                            ->label('LinkedIn')
                                            ->url()
                                            ->placeholder('https://linkedin.com/company/...'),
                                        TextInput::make('social_github')
                                            ->label('GitHub')
                                            ->url()
                                            ->placeholder('https://github.com/...'),
                                    ])
                                    ->columns(2),
                            ]),

                        Tab::make('Pricing Plans')
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Section::make('Standard Build')
                                    ->description('One-time project pricing.')
                                    ->schema([
                                        TextInput::make('pricing_standard_title')->label('Title')->placeholder('Standard Build'),
                                        TextInput::make('pricing_standard_price')->label('Price')->placeholder('Fixed Price'),
                                        Textarea::make('pricing_standard_desc')->label('Description')->rows(2)->columnSpanFull(),
                                        TextInput::make('pricing_standard_features')->label('Features (comma-separated)')->placeholder('Custom Design,Development,30 Days Support')->columnSpanFull(),
                                        TextInput::make('pricing_standard_cta')->label('Button Text')->placeholder('Get Quote'),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),

                                Section::make('Monthly Partner (Popular)')
                                    ->description('The recommended ongoing plan.')
                                    ->schema([
                                        TextInput::make('pricing_popular_title')->label('Title')->placeholder('Monthly Partner'),
                                        TextInput::make('pricing_popular_price')->label('Price')->placeholder('From $3k'),
                                        TextInput::make('pricing_popular_period')->label('Period')->placeholder('/mo'),
                                        Textarea::make('pricing_popular_desc')->label('Description')->rows(2)->columnSpanFull(),
                                        TextInput::make('pricing_popular_features')->label('Features (comma-separated)')->placeholder('Unlimited Tasks,Priority Support,Ad Management')->columnSpanFull(),
                                        TextInput::make('pricing_popular_cta')->label('Button Text')->placeholder('Initialize'),
                                    ])
                                    ->columns(3)
                                    ->collapsible(),

                                Section::make('Flexible Budget')
                                    ->description('Budget-first approach.')
                                    ->schema([
                                        TextInput::make('pricing_flex_title')->label('Title')->placeholder('Your Budget'),
                                        TextInput::make('pricing_flex_price')->label('Price')->placeholder('Flexible'),
                                        Textarea::make('pricing_flex_desc')->label('Description')->rows(2)->columnSpanFull(),
                                        TextInput::make('pricing_flex_features')->label('Features (comma-separated)')->placeholder('Tailored Features,Scalable Roadmap')->columnSpanFull(),
                                        TextInput::make('pricing_flex_cta')->label('Button Text')->placeholder('Share Budget'),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }

    protected function getFormActions(): array
    {
        return [
            \Filament\Actions\Action::make('save')
                ->label('Save Settings')
                ->submit('save'),
        ];
    }
}
