// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SITE_URL = 'https://yass-route.netlify.app';
const SITE_NAME = 'Yass Route';
const DEFAULT_TITLE = 'Yass Route | Connect, Share, and Discover';
const DEFAULT_DESCRIPTION = 'Join Yass Route to connect with friends, share your moments, and discover trending content in a vibrant global community.';
const DEFAULT_IMAGE = `${SITE_URL}/default-og-image.jpg`;
const TWITTER_HANDLER = '@YassRoute';

export const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  locale = 'en_US',
  author,
  noindex = false,
}) => {
  const seoTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const seoDescription = description || DEFAULT_DESCRIPTION;
  const seoImage = image || DEFAULT_IMAGE;
  const seoUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}

      {/* Indexing Rules */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Cards Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLER} />
      <meta name="twitter:creator" content={TWITTER_HANDLER} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  locale: PropTypes.string,
  author: PropTypes.string,
  noindex: PropTypes.bool,
};
