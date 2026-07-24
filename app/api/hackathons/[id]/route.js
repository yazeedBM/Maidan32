import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { serializeHackathon } from "@/lib/serialize";

export async function GET(_req, { params }) {
  const hackathon = await prisma.hackathon.findUnique({ where: { id: params.id } });
  if (!hackathon) {
    return NextResponse.json({ error: "الهاكاثون غير موجود" }, { status: 404 });
  }
  return NextResponse.json({ hackathon: serializeHackathon(hackathon) });
}

export async function DELETE(_req, { params }) {
  const sessionUser = getSessionUser();
  if (!sessionUser || sessionUser.role !== "admin") {
    return NextResponse.json({ error: "غير مصرح لك بهذا الإجراء" }, { status: 403 });
  }

  // Teams under this hackathon are removed automatically (onDelete: Cascade in the schema).
  await prisma.hackathon.delete({ where: { id: params.id } }).catch(() => null);

  return NextResponse.json({ ok: true });
}
