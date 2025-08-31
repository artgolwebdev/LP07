# 🚀 Deployment Guide - GitHub Pages

This guide will help you deploy your INK Studio landing page to GitHub Pages using the included GitHub Actions workflow.

## 📋 Prerequisites

- GitHub repository with your project
- GitHub Pages enabled in your repository
- Node.js 18+ installed locally (for development)

## 🔧 Setup GitHub Pages

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** or **master** branch
6. Select **/ (root)** folder
7. Click **Save**

### 2. Configure GitHub Actions

The workflow is already configured in `.github/workflows/deploy.yml`. It will:
- Trigger on pushes to main/master branch
- Build your React app
- Deploy to GitHub Pages automatically

## 🚀 Automatic Deployment

### What Happens Automatically

1. **Push to main branch** → Triggers workflow
2. **Workflow runs** → Builds and deploys
3. **Site updates** → Available at `https://username.github.io/repo-name`

### Workflow Details

- **Build Job**: Installs dependencies and builds the project
- **Deploy Job**: Deploys the built files to GitHub Pages
- **Concurrency**: Prevents multiple deployments running simultaneously

## 🛠️ Manual Deployment (Optional)

If you prefer manual deployment:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Build Output

The build process creates a `build/` folder containing:
- `index.html` - Main HTML file
- `assets/` - JavaScript, CSS, and other assets
- Static files and images

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**
   - Check GitHub Actions logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Site not updating**
   - Wait a few minutes for deployment
   - Check GitHub Actions status
   - Clear browser cache

3. **404 errors**
   - Ensure GitHub Pages is enabled
   - Check branch and folder settings
   - Verify workflow file exists

### Check Deployment Status

1. Go to **Actions** tab in your repository
2. Look for **Deploy to GitHub Pages** workflow
3. Check the latest run status
4. View logs for any errors

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file in your repository root:
   ```
   yourdomain.com
   ```

2. Configure DNS records:
   - Type: `CNAME`
   - Name: `@`
   - Value: `username.github.io`

3. Update GitHub Pages settings with your domain

## 📱 Performance Tips

- Images are optimized during build
- CSS and JS are minified
- Assets are cached for better performance
- Consider using CDN for large images

## 🔒 Security

- GitHub Pages provides HTTPS by default
- No sensitive data should be in the repository
- Use environment variables for API keys (if needed)

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review this deployment guide
3. Check GitHub Pages documentation
4. Open an issue in your repository

---

**Happy Deploying! 🎉**
