# 🔧 Troubleshooting Guide

This guide helps resolve common issues with the INK Studio project.

## 🚨 GitHub Actions Build Failures

### Common Error: "Process completed with exit code 1"

#### 1. **Dependency Issues**
```bash
# Locally test the build
npm install
npm run build
```

**Solutions:**
- Ensure all dependencies have proper versions (not `"*"`)
- Check for missing peer dependencies
- Verify Node.js version compatibility

#### 2. **Import Statement Errors**
```bash
# Check for broken imports
grep -r "from \"\"" src/
```

**Solutions:**
- Fix empty import statements
- Ensure package names are correct
- Remove version numbers from imports

#### 3. **TypeScript Errors**
```bash
# Check TypeScript compilation
npx tsc --noEmit
```

**Solutions:**
- Add missing type definitions
- Fix type mismatches
- Ensure proper TypeScript configuration

## 🐛 Local Build Issues

### Build Fails Locally
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Import Resolution Issues
```bash
# Check import paths
grep -r "import.*from" src/
```

### Missing Dependencies
```bash
# Install missing packages
npm install package-name
```

## 🔍 Debugging Steps

### 1. **Check GitHub Actions Logs**
- Go to Actions tab in your repository
- Click on the failed workflow
- Review the build step logs
- Look for specific error messages

### 2. **Local Environment Testing**
```bash
# Test in clean environment
npm run build
npm run preview
```

### 3. **Dependency Verification**
```bash
# Check installed packages
npm list --depth=0
npm audit
```

### 4. **Node.js Version Check**
```bash
# Ensure correct Node version
node --version
npm --version
```

## 🛠️ Quick Fixes

### Fix Import Statements
```javascript
// Before (broken)
import { Button } from "";

// After (fixed)
import { Button } from "@radix-ui/react-button";
```

### Fix Package Versions
```json
// Before (problematic)
"motion": "*"

// After (fixed)
"motion": "^11.0.0"
```

### Add Missing Types
```bash
npm install --save-dev @types/react @types/react-dom
```

## 📋 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Build fails in CI | Missing dependencies | Fix package.json versions |
| Import errors | Broken import paths | Fix import statements |
| TypeScript errors | Missing type definitions | Install @types packages |
| Node version mismatch | CI uses different Node version | Specify Node version in workflow |
| Permission denied | GitHub Actions permissions | Check workflow permissions |

## 🚀 Prevention Tips

1. **Always test locally** before pushing
2. **Use specific versions** instead of `"*"`
3. **Keep dependencies updated** regularly
4. **Test in clean environment** occasionally
5. **Monitor GitHub Actions** for failures

## 📞 Getting Help

If issues persist:

1. **Check GitHub Actions logs** for specific errors
2. **Test locally** to reproduce the issue
3. **Review recent changes** that might have caused the problem
4. **Check dependency compatibility** with your Node.js version
5. **Open an issue** in the repository with error details

---

**Remember**: Most build issues can be resolved by ensuring local builds work first! 🎯
