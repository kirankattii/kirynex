#!/usr/bin/env node
/**
 * Postbuild script for sitemap generation
 * This script runs after the Next.js build and generates the sitemap
 * It won't fail the build if sitemap generation fails
 */

const { execSync } = require('child_process');

try {
  console.log('Generating sitemap...');
  execSync('npx next-sitemap', { stdio: 'inherit' });
  console.log('✓ Sitemap generated successfully');
  process.exit(0);
} catch (error) {
  console.warn('⚠ Warning: Sitemap generation failed, but continuing deployment...');
  console.warn('Error:', error.message);
  // Exit with success code so build doesn't fail
  process.exit(0);
}

