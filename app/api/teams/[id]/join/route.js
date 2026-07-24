import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(_req, { params }) {
  const sessionUser = getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
  }

  const team = await prisma.team.findUnique({
    where: { id: params.id },
    include: { members: true },
  });
  if (!team) {
    return NextResponse.json({ error: "الفريق غير موجود" }, { status: 404 });
  }

  if (team.members.some((m) => m.userId === sessionUser.id)) {
    return NextResponse.json({ error: "أنت بالفعل عضو في هذا الفريق" }, { status: 400 });
  }

  if (team.members.length >= team.maxMembers) {
    return NextResponse.json({ error: "الفريق مكتمل العدد" }, { status: 400 });
  }

  await prisma.teamMember.create({
    data: { teamId: team.id, userId: sessionUser.id },
  });

  return NextResponse.json({ ok: true });
}
