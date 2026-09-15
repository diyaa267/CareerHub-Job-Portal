import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';
import { listJobs } from '../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = (searchParams.get('q') || '').trim();
  const mode = searchParams.get('mode') || 'ALL';
  const type = searchParams.get('type') || 'ALL';

  try {
    const db = getDb();

    const jobs = await db.job.findMany({
      where: {
        status: 'OPEN',
        ...(mode !== 'ALL' ? { workMode: mode as any } : {}),
        ...(type !== 'ALL' ? { employmentType: type as any } : {}),
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    const filteredJobs = q
      ? jobs.filter((job) => {
          const search = q.toLowerCase();

          return (
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search) ||
            job.location.toLowerCase().includes(search) ||
            String(job.skills ?? '').toLowerCase().includes(search)
          );
        })
      : jobs;

    return NextResponse.json(
      filteredJobs.length ? filteredJobs : listJobs({ q, mode, type })
    );
  } catch {
    return NextResponse.json(listJobs({ q, mode, type }));
  }
}
