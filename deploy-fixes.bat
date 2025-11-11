@echo off
echo ========================================
echo Deploying Vercel Fixes
echo ========================================
echo.

echo Step 1: Adding all changes to git...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "Fix Vercel deployment: API routes, CSS layout, and animations"

echo.
echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo Deployment complete!
echo ========================================
echo.
echo Vercel will automatically redeploy your site.
echo Check your Vercel dashboard for deployment status.
echo.
pause
