/** next-sitemap.config.js */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kirynex.in',       // canonical domain
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/admin/*','/login'],      // optional
    robotsTxtOptions: {
      additionalSitemaps: [],            // DO NOT include sitemap.xml here
    },
  };
  