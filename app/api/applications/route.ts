import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  allApplications,
  applyToJob,
  patchApplication,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();

    const applications = await db.application.findMany({
      orderBy: {
        appliedAt: "desc",
      },
      include: {
        job: true,
        candidate: true,
      },
    });

    return NextResponse.json(applications);
  } catch {
    return NextResponse.json(allApplications());
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const jobId = Number(body.jobId);
  const candidateId = Number(body.candidateId || 2);

  try {
    const db = getDb();

    const job = await db.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job || job.status !== "OPEN") {
      return NextResponse.json(
        {
          error: "Job is no longer open",
        },
        {
          status: 400,
        }
      );
    }

    const candidate = await db.user.findUnique({
      where: {
        id: candidateId,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        {
          error: "Candidate profile not found",
        },
        {
          status: 400,
        }
      );
    }

    // Safely handle nullable skills
    const jobSkills: string[] = job.skills ?? [];
    const candidateSkills: string[] = candidate.skills ?? [];

    const overlap = jobSkills.filter((skill) =>
      candidateSkills.some(
        (candidateSkill) =>
          candidateSkill.toLowerCase() === skill.toLowerCase()
      )
    ).length;

    const score = Math.min(
      98,
      Math.round(
        (overlap / Math.max(jobSkills.length, 1)) * 100
      ) + 35
    );

    const application = await db.application.create({
      data: {
        jobId,
        candidateId,
        coverLetter: body.coverLetter || "",
        resumeUrl: candidate.resumeUrl,
        matchScore: score,
      },
    });

    return NextResponse.json(application);
  } catch (error: any) {
    try {
      const application = applyToJob(jobId, body);

      return NextResponse.json(application, {
        status: 201,
      });
    } catch (fallbackError: any) {
      return NextResponse.json(
        {
          error:
            fallbackError?.code === "P2002"
              ? "Already applied"
              : fallbackError?.message ||
                "Could not submit application",
        },
        {
          status: 400,
        }
      );
    }
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();

  try {
    const db = getDb();

    const application = await db.application.update({
      where: {
        id: Number(body.id),
      },
      data: {
        status: body.status,
        recruiterNote: body.recruiterNote,
      },
    });

    return NextResponse.json(application);
  } catch {
    return NextResponse.json(patchApplication(body));
  }
}