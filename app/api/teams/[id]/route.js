import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { serializeTeam } from "@/lib/serialize";

export async function GET(_req, { params }) {
  const sessionUser = getSessionUser();

  const team = await prisma.team.findUnique({
    where: { id: params.id },
    include: {
      hackathon: { select: { id: true, title: true, date: true, coverImage: true } },
      members: { include: { user: true } },
    },
  });

  if (!team) {
    return NextResponse.json({ error: "الفريق غير موجود" }, { status: 404 });
  }

  const serialized = serializeTeam(team, { currentUserId: sessionUser?.id });
  return NextResponse.json({ team: serialized, isMember: serialized.isMember });
}
