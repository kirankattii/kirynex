/** next-sitemap.config.js */
module.exports = {
    siteUrl: 'https://kirynex.in',       // canonical domain
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/admin/*','/login'],      // optional
    robotsTxtOptions: {
      additionalSitemaps: [],            // DO NOT include sitemap.xml here
    },
  };
  