<?php

namespace App\Support\Sanitizer;

use Symfony\Component\HtmlSanitizer\Parser\ParserInterface;

/**
 * A legacy HTML parser compatible with PHP 8.2 and earlier.
 * This satisfies the ParserInterface while returning standard \DOMNode objects.
 */
class LegacyParser implements ParserInterface
{
    /**
     * @param string $html The HTML string to parse
     * @param string $context The name of the context element
     * @return \DOMNode|null
     */
    public function parse(string $html, string $context = 'body'): \DOMNode|null
    {
        if (empty(trim($html))) {
            return null;
        }

        $dom = new \DOMDocument();
        
        // Suppress warnings for malformed HTML fragments
        // We wrap the input in the context tag to ensure proper nesting
        @$dom->loadHTML(
            '<' . $context . '>' . $html . '</' . $context . '>', 
            LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOERROR | LIBXML_NOWARNING
        );

        return $dom->getElementsByTagName($context)->item(0);
    }
}
