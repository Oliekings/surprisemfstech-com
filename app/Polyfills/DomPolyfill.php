<?php

namespace Dom;

/**
 * Polyfill for PHP 8.4's Dom\HTMLDocument for compatibility with PHP 8.2/8.3.
 * This is used by modern versions of Filament/Symfony HTML Sanitizer.
 */
class HTMLDocument extends \DOMDocument
{
    public static function createFromString(string $html, int $encoding = 0): self
    {
        $doc = new self();
        
        // Use the classic DOMDocument HTML loader
        // We suppress errors because legacy HTML often has parsing warnings
        @$doc->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        return $doc;
    }

    public function saveHTML($node = null): string|false
    {
        return parent::saveHTML($node);
    }
}
