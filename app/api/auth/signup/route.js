import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    const { fullName, email, password, phone, role } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "الاسم الكامل والبريد الإلكتروني وكلمة المرور مطلوبة" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json(
        { error: "هذا البريد الإلكتروني مستخدم بالفعل" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Only allow "admin" role signup if the correct shared invite key is provided.
    const finalRole =
      role === "admin" &&
      process.env.ADMIN_SIGNUP_KEY &&
      req.headers.get("x-admin-key") === process.env.ADMIN_SIGNUP_KEY
        ? "admin"
        : "user";

    const user = await prisma.user.create({
      data: {
        fullName,
        email: normalizedEmail,
        passwordHash,
        phone: phone || "",
        role: finalRole,
      },
    });

    const token = signToken({
      id: user.id,
      role: user.role,
      fullName: user.fullName,
      email: user.email,
    });
    setAuthCookie(token);

    return NextResponse.json({
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}
