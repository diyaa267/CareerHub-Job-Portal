import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { createJob, recruiterJobs } from '../../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();

    const jobs = await db.job.findMany({
      where: {
        recruiterId: 1,
      },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      jobs.length ? jobs : recruiterJobs()
    );
  } catch {
    return NextResponse.json(recruiterJobs());
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();

    if (
      !b.title ||
      !b.company ||
      !b.location ||
      !b.description ||
      !Array.isArray(b.skills) ||
      b.skills.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            'Title, company, location, description and skills are required',
        },
        { status: 400 }
      );
    }

    try {
      const db = getDb();

      const salary =
        b.salary ??
        (b.salaryMin != null && b.salaryMax != null
          ? `${b.salaryMin}-${b.salaryMax}`
          : b.salaryMin != null
            ? String(b.salaryMin)
            : null);

      const job = await db.job.create({
        data: {
          title: String(b.title),
          company: String(b.company),
          location: String(b.location),
          workMode: b.workMode || 'HYBRID',
          employmentType: b.employmentType || 'FULL_TIME',
          salary,
          description: String(b.description),
          requirements: Array.isArray(b.requirements)
            ? b.requirements
            : [],
          benefits: Array.isArray(b.benefits)
            ? b.benefits
            : [],
          skills: Array.isArray(b.skills)
            ? b.skills
            : [],
          recruiterId: 1,
        },
      });

      return NextResponse.json(job, { status: 201 });
    } catch {
      return NextResponse.json(createJob(b), { status: 201 });
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}