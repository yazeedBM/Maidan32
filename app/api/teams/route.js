import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { serializeTeam } from "@/lib/serialize";

const teamInclude = {
  hackathon: { select: { id: true, title: true, date: true, coverImage: true } },
  members: { include: { user: true } },
};

// GET /api/teams?hackathon=<id> -> list teams (optionally filtered), contact info hidden unless viewer is a member
export async function GET(req) {
  const sessionUser = getSessionUser();
  const hackathonId = req.nextUrl.searchParams.get("hackathon");

  const teams = await prisma.team.findMany({
    where: hackathonId ? { hackathonId } : undefined,
    include: teamInclude,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    teams: teams.map((t) => serializeTeam(t, { currentUserId: sessionUser?.id })),
  });
}

// POST /api/teams -> admin creates an open team under a hackathon
export async function POST(req) {
  const sessionUser = getSessionUser();
  if (!sessionUser || sessionUser.role !== "admin") {
    return NextResponse.json({ error: "غير مصرح لك بهذا الإجراء" }, { status: 403 });
  }

  try {
    const body = await req.json();
    if (!body.name || !body.hackathon) {
      return NextResponse.json(
        { error: "اسم الفريق والهاكاثون مطلوبان" },
        { status: 400 }
      );
    }

    const team = await prisma.team.create({
      data: {
        hackathonId: body.hackathon,
        name: body.name,
        description: body.description || "",
        skillsNeeded: JSON.stringify(body.skillsNeeded || []),
        maxMembers: Number(body.maxMembers) || 4,
        createdById: sessionUser.id,
      },
      include: teamInclude,
    });

    return NextResponse.json({ team: serializeTeam(team, { currentUserId: sessionUser.id }) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}
