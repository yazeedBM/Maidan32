import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { serializeUser } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";
import ProfileForm from "@/components/ProfileForm";
import Footer from "@/components/Footer";

async function getUser(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { experience: true },
  });
  return serializeUser(user);
}

export default async function ProfilePage() {
  const sessionUser = getSessionUser();
  if (!sessionUser) redirect("/login");

  const user = await getUser(sessionUser.id);

  return (
    <main>
      <section className="bg-navy-950 py-14 text-center">
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">ملفي الشخصي</h1>
        <p className="mt-3 text-sm text-white/60">سيرتك الذاتية المصغرة التي تعرّف الفرق بك</p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <ProfileForm initialUser={user} />
      </section>

      <Footer />
    </main>
  );
}
