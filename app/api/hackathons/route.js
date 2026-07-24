import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { serializeHackathon } from "@/lib/serialize";

export async function GET() {
  const hackathons = await prisma.hackathon.findMany({ orderBy: { date: "asc" } });
  return NextResponse.json({ hackathons: hackathons.map(serializeHackathon) });
}

export async function POST(req) {
  const sessionUser = getSessionUser();
  if (!sessionUser || sessionUser.role !== "admin") {
    return NextResponse.json({ error: "غير مصرح لك بهذا الإجراء" }, { status: 403 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.date || !body.officialUrl) {
      return NextResponse.json(
        { error: "اسم الهاكاثون والتاريخ والرابط الرسمي مطلوبة" },
        { status: 400 }
      );
    }

    const hackathon = await prisma.hackathon.create({
      data: {
        title: body.title,
        organizer: body.organizer || "",
        description: body.description || "",
        fields: JSON.stringify(body.fields || []),
        location: body.location || "عن بعد",
        date: new Date(body.date),
        durationDays: Number(body.durationDays) || 2,
        prize: Number(body.prize) || 0,
        teamSizeMin: Number(body.teamSizeMin) || 1,
        teamSizeMax: Number(body.teamSizeMax) || 4,
        registrationStatus: body.registrationStatus || "مفتوح",
        targetAudience: body.targetAudience || "",
        coverImage: body.coverImage || "",
        officialUrl: body.officialUrl,
        createdById: sessionUser.id,
      },
    });

    return NextResponse.json({ hackathon: serializeHackathon(hackathon) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}
