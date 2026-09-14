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

    return NextResponse.json(
      await db.application.findMany({
        orderBy: { appliedAt: "desc" },
        include: {
          job: true,
          candidate: true,
        },
      })
    );
  } catch {
    return NextResponse.json(allApplications());
  }
}

export async function POST(req: Request) {
  const b = await req.json();

  const jobId = Number(b.jobId);
  const candidateId = Number(b.candidateId || 2);

  try {
    const db = getDb();

    const job = await db.job.findUnique({
      where: { id: jobId },
    });

    if (!job || job.status !== "OPEN") {
      return NextResponse.json(
        { error: "Job is no longer open" },
        { status: 400 }
      );
    }

    const candidate = await db.user.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate profile not found" },
        { status: 400 }
      );
    }

    const jobSkills = job.skills ?? [];
    const candidateSkills = candidate.skills ?? [];

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

    return NextResponse.json(
      await db.application.create({
        data: {
          jobId,
          candidateId,
          coverLetter: b.coverLetter || "",
          resumeUrl: candidate.resumeUrl,
          matchScore: score,
        },
      })
    );
  } catch (e: any) {
    try {
      return NextResponse.json(applyToJob(jobId, b), {
        status: 201,
      });
    } catch (f: any) {
      return NextResponse.json(
        {
          error:
            f.code === "P2002"
              ? "Already applied"
              : f.message || "Could not submit application",
        },
        { status: 400 }
      );
    }
  }
}

export async function PATCH(req: Request) {
  const b = await req.json();

  try {
    const db = getDb();

    return NextResponse.json(
      await db.application.update({
        where: { id: Number(b.id) },
        data: {
          status: b.status,
          recruiterNote: b.recruiterNote,
        },
      })
    );
  } catch {
    return NextResponse.json(patchApplication(b));
  }
}