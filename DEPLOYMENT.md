# GitHub Pages Deployment Guide

## 🚀 Quick Deployment

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "SEO optimized tattoo studio landing page"
   git push origin main
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch
   - Save

## 📋 Pre-deployment Checklist

- [ ] Update `yourusername` in `index.html` meta tags
- [ ] Update `yourusername` in `sitemap.xml`
- [ ] Update `yourusername` in `robots.txt`
- [ ] Update `homepage` in `package.json`
- [ ] Ensure all assets are in `public/assets/` folder

## 🔧 Configuration Files

### Update GitHub Username
Replace `yourusername` with your actual GitHub username in:
- `index.html` - Open Graph and Twitter meta tags
- `sitemap.xml` - All URLs
- `robots.txt` - Sitemap URL
- `package.json` - Homepage field

### Example:
```html
<!-- Before -->
<meta property="og:url" content="https://yourusername.github.io/LP07/" />

<!-- After -->
<meta property="og:url" content="https://johndoe.github.io/LP07/" />
```

## 🌐 Custom Domain (Optional)

If you want to use a custom domain:

1. Add `CNAME` file in `public/` folder:
   ```
   yourdomain.com
   ```

2. Update all URLs in meta tags to use your domain instead of GitHub Pages URL

## 📱 Testing

After deployment:
1. Test on mobile devices
2. Check meta tags with [Meta Tags Checker](https://metatags.io/)
3. Validate structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
4. Test page speed with [PageSpeed Insights](https://pagespeed.web.dev/)

## 🚨 Common Issues

- **404 errors**: Ensure `base: '/LP07/'` in `vite.config.ts`
- **Assets not loading**: Check file paths in `public/assets/`
- **Meta tags not working**: Clear browser cache and test with meta tag checker

## 📊 SEO Monitoring

- Submit sitemap to Google Search Console
- Monitor Core Web Vitals
- Track search rankings for target keywords
- Monitor mobile usability

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
