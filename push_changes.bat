@echo off
REM Git push script for feat/frontend-ui branch

cd "c:\Users\admin\Desktop\civicLence\CivicLens"

echo.
echo ===================================
echo Pushing changes to feat/frontend-ui
echo ===================================
echo.

REM Stage the SYED_TASKS.md changes
echo [1/4] Staging files...
git add docs/SYED_TASKS.md

REM Check git status
echo [2/4] Current status:
git status

REM Commit changes
echo.
echo [3/4] Committing changes...
git commit -m "docs: update SYED_TASKS.md to reference feat/frontend-ui branch

- Update branch reference from feat/report-dashboard to feat/frontend-ui
- Add section about available frontend assets and documentation
- Include quick reference table for implementation tasks
- Add git workflow for working with feat/frontend-ui branch
- Document all available mockup references and specs"

REM Push to remote
echo.
echo [4/4] Pushing to remote...
git push origin feat/frontend-ui

echo.
echo ===================================
echo Push complete!
echo ===================================
echo.
echo Current branch status:
git log --oneline -3
echo.

pause
