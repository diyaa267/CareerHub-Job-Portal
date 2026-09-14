# CareerHub — 2026 Job Portal & Recruitment Platform

A modern full-stack recruitment platform connecting candidates and companies through job discovery, profiles, resumes, applications and recruiter pipelines.

## Core flow
Candidate: Home → Search jobs → Filters → Job details → Profile → Resume → Apply → Track → Interview → Offer/Hire.

Recruiter: Dashboard → Company/jobs → Post role → Applicant list → Match score → Shortlist → Interview → Offer/Hire.

## Included
- Candidate + recruiter + admin dashboards
- Job search and filters
- Job details and application flow
- Application status pipeline
- Skill-based match score
- Resume-ready candidate profile
- Recruiter analytics
- Responsive dark 2026 UI
- PostgreSQL + Prisma

## Run locally
```powershell
Copy-Item .env.example .env
# edit DATABASE_URL
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```
Open http://localhost:3000

Demo candidate: candidate@careerhub.demo
Demo recruiter: recruiter@careerhub.demo

> Demo authentication is intentionally simplified for this internship project. For production, add Auth.js/Clerk, S3/Cloudinary signed uploads, email notifications and real authentication.
