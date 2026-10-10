@echo off
setlocal enabledelayedexpansion

cd /d "c:\Users\admin\Desktop\civicLence\CivicLens"

echo.
echo ============================================
echo Git Push to feat/frontend-ui
echo ============================================
echo.

echo [1/4] Current directory:
cd

echo.
echo [2/4] Checking git status...
git status --porcelain

echo.
echo [3/4] Staging all files...
git add .

echo.
echo [4/4] Creating commit...
git commit -m "feat: add comprehensive frontend UI documentation

- Add FRONTEND_PAGES.md with complete specification (850+ lines)
- Create docs/mockups/ with detailed documentation for all sections
- Add public/assets/README.md with design system (600+ lines)
- Include mockup specifications and component library
- Add scripts/generate_mockups.py for image generation
- Update SYED_TASKS.md to reference feat/frontend-ui branch
- Document UI components, colors, typography, responsive design
- Include React/Next.js implementation examples
- Add accessibility and performance guidelines"

echo.
echo [5/5] Pushing to remote...
git push origin feat/frontend-ui

echo.
echo ============================================
echo Push Complete!
echo ============================================
echo.
echo Checking log...
git log --oneline -5

echo.
pause
