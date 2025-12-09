/** next-sitemap.config.js */
module.exports = {
    siteUrl: 'https://kirynex.in',
    generateRobotsTxt: true,        // (optional) generates robots.txt
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/admin/*','/login'],
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://kirynex.in/sitemap.xml', // optional explicit sitemap URL
      ],
    },
  };
  