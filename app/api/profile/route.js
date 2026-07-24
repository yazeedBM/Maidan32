import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { serializeUser } from "@/lib/serialize";

export async function GET() {
  const sessionUser = getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: { experience: true },
  });
  if (!user) {
    return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
  }

  return NextResponse.json({ user: serializeUser(user) });
}

export async function PUT(req) {
  const sessionUser = getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fullName, phone, profile } = body;

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: sessionUser.id },
        data: {
          ...(fullName && { fullName }),
          ...(phone !== undefined && { phone }),
          ...(profile?.bio !== undefined && { bio: profile.bio }),
          ...(profile?.skills && { skills: JSON.stringify(profile.skills) }),
          ...(profile?.links && { links: JSON.stringify(profile.links) }),
        },
      });

      // Experience is fully replaced on every save (the form always sends the complete list).
      if (profile?.experience) {
        await tx.experience.deleteMany({ where: { userId: sessionUser.id } });
        if (profile.experience.length > 0) {
          await tx.experience.createMany({
            data: profile.experience.map((e) => ({
              userId: sessionUser.id,
              title: e.title || "",
              description: e.description || "",
              year: e.year || "",
            })),
          });
        }
      }
    });

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      include: { experience: true },
    });

    return NextResponse.json({ user: serializeUser(user) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}
