# Git push script
Write-Host "=== Checking Git Status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Adding Files ===" -ForegroundColor Cyan
git add app/page.jsx sections/partnerSectionHtml.js

Write-Host "`n=== Committing Changes ===" -ForegroundColor Cyan
git commit -m "Fix hero padding (40px) and MailChimp logo size" -m "- Set hero top padding to 40px" -m "- Reduce MailChimp logo to h-8 md:h-12"

Write-Host "`n=== Pushing to GitHub ===" -ForegroundColor Cyan
git push origin main

Write-Host "`n=== Verification ===" -ForegroundColor Cyan
Write-Host "Local commits:" -ForegroundColor Yellow
git log --oneline -3

Write-Host "`nUnpushed commits:" -ForegroundColor Yellow
git log origin/main..main --oneline

Write-Host "`n=== DONE ===" -ForegroundColor Green
Write-Host "Check GitHub and Vercel for updates"
