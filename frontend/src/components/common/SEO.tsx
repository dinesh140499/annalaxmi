import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  noIndex?: boolean;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'GrainPulse | 100% Pure Organic Pulses, Ancient Grains & Cold-Pressed Oils';
const DEFAULT_DESCRIPTION =
  'Shop premium unpolished pulses, naturally sourced ancient grains, cold-pressed edible oils, and sun-dried spices from GrainPulse. Farm-fresh organic nutrition delivered nationwide.';
const DEFAULT_KEYWORDS =
  'organic pulses, ancient grains, cold pressed oils, organic dal, pure spices, unpolished dals, natural whole grains, healthy grocery, GrainPulse';
const DEFAULT_IMAGE = '/grainpulse-logo.png';
const BASE_URL = 'https://grainpulse.com';

const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  noIndex = false,
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Set Document Title
    const formattedTitle = title ? `${title} | GrainPulse` : DEFAULT_TITLE;
    document.title = formattedTitle;

    // Helper to create or update meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'title', formattedTitle);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // 3. Open Graph Tags
    const fullUrl = canonicalUrl ? `${BASE_URL}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}` : window.location.href;
    const fullImg = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', fullImg);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'GrainPulse');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImg);
    setMetaTag('name', 'twitter:url', fullUrl);

    // 5. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // 6. JSON-LD Structured Data
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
    existingScripts.forEach((s) => s.remove());

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup custom JSON-LD on route leave
      const scripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, noIndex, jsonLd]);

  return null;
};

export default SEO;
