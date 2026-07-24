import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { serializeHackathon } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";
import AdminHackathonsClient from "@/components/AdminHackathonsClient";

async function getHackathons() {
  const hackathons = await prisma.hackathon.findMany({ orderBy: { date: "asc" } });
  return hackathons.map(serializeHackathon);
}

export default async function AdminHackathonsPage() {
  const sessionUser = getSessionUser();
  if (!sessionUser) redirect("/login");
  if (sessionUser.role !== "admin") redirect("/");

  const hackathons = await getHackathons();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="mb-1 text-2xl font-extrabold text-navy-900">إدارة الهاكاثونات</h1>
      <p className="mb-8 text-sm text-navy-800/60">أضف هاكاثونات جديدة أو احذف الموجودة حالياً</p>
      <AdminHackathonsClient initialHackathons={hackathons} />
    </main>
  );
}
