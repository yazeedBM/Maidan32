// Run with: npm run seed
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.hackathon.deleteMany();

  const h1 = await prisma.hackathon.create({
    data: {
      title: "هاكاثون بيت الشاورما",
      organizer: "بيت الشاورما",
      description:
        "هاكاثون يهدف إلى تطوير حلول تقنية مبتكرة تعزز تجربة العملاء وتحسّن العمليات التشغيلية في قطاع المطاعم والخدمات الغذائية.",
      fields: JSON.stringify(["الذكاء الاصطناعي", "تجربة المستخدم (UX)", "تطبيقات الجوال", "تحليل البيانات", "التسويق الرقمي"]),
      location: "عن بعد",
      date: new Date("2026-09-05"),
      durationDays: 2,
      prize: 3000,
      teamSizeMin: 1,
      teamSizeMax: 4,
      registrationStatus: "مفتوح",
      targetAudience: "المطورون، المصممون، محللو البيانات، خبراء التسويق، ورواد الأعمال",
      officialUrl: "https://example.com/hackathon",
    },
  });

  const h2 = await prisma.hackathon.create({
    data: {
      title: "مثال هاكاثون رقم واحد",
      organizer: "جهة منظمة افتراضية",
      description: "وصف مختصر لهاكاثون تجريبي.",
      fields: JSON.stringify(["الأمن السيبراني", "إنترنت الأشياء"]),
      location: "الرياض",
      date: new Date("2026-07-19"),
      durationDays: 2,
      prize: 3000,
      teamSizeMin: 1,
      teamSizeMax: 4,
      registrationStatus: "مفتوح",
      targetAudience: "الطلاب والمهتمون بالتقنية",
      officialUrl: "https://example.com/hackathon-2",
    },
  });

  await prisma.hackathon.create({
    data: {
      title: "مثال هاكاثون رقم اثنين",
      organizer: "جهة منظمة افتراضية",
      description: "وصف مختصر لهاكاثون تجريبي آخر.",
      fields: JSON.stringify(["تطوير الويب", "التصميم الجرافيكي"]),
      location: "جدة",
      date: new Date("2026-08-01"),
      durationDays: 3,
      prize: 5000,
      teamSizeMin: 2,
      teamSizeMax: 5,
      registrationStatus: "مفتوح",
      targetAudience: "المطورون والمصممون",
      officialUrl: "https://example.com/hackathon-3",
    },
  });

  await prisma.team.create({
    data: {
      hackathonId: h1.id,
      name: "فريق الشاورما التقنية",
      description: "نبحث عن مطور Backend ومصمم واجهات للانضمام إلينا.",
      skillsNeeded: JSON.stringify(["Node.js", "تصميم UI"]),
      maxMembers: 4,
    },
  });

  await prisma.team.create({
    data: {
      hackathonId: h2.id,
      name: "فريق الابتكار الأول",
      description: "فريق مكوّن من مطورين، نرحب بأي تخصص جديد.",
      skillsNeeded: JSON.stringify(["React", "تحليل بيانات"]),
      maxMembers: 4,
    },
  });

  console.log("Seeded 3 hackathons and 2 teams.");
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
