/**
 * Sample data matching the shapes used across the UI.
 * Replace with Prisma queries when wiring the backend (shapes are stable).
 */

export const HACKATHONS = [
  {
    id: "1",
    title: "هاكاثون بيت الشاورما",
    fields: "الذكاء الاصطناعي، التصميم، الشاورما",
    duration: "2 يوم",
    members: "1-4 أعضاء",
    prize: "3000",
    date: "19 يوليو",
    location: "عن بعد",
    image: "/images/hackathon-1.jpg",
    logo: null,
    featured: true,
    description:
      "هاكاثون تقني يجمع المبتكرين لبناء حلول ذكية في مجالات الذكاء الاصطناعي والتصميم خلال يومين من العمل المكثف.",
  },
  {
    id: "2",
    title: "مثال هاكاثون رقم واحد",
    fields: "الذكاء الاصطناعي، التصميم، الشاورما",
    duration: "2 يوم",
    members: "1-4 أعضاء",
    prize: "3000",
    date: "19 يوليو",
    location: "عن بعد",
    image: "/images/hackathon-2.jpg",
    featured: false,
    description:
      "وصف تجريبي للهاكاثون يوضح الأهداف والمجالات وشروط المشاركة.",
  },
  {
    id: "3",
    title: "مثال هاكاثون رقم واحد",
    fields: "الذكاء الاصطناعي، التصميم، الشاورما",
    duration: "2 يوم",
    members: "1-4 أعضاء",
    prize: "3000",
    date: "19 يوليو",
    location: "عن بعد",
    image: "/images/hackathon-3.jpg",
    featured: false,
    description:
      "وصف تجريبي للهاكاثون يوضح الأهداف والمجالات وشروط المشاركة.",
  },
  {
    id: "4",
    title: "هاكاثون أمد : أكثر من ألف مشارك",
    fields: "التقنية المالية",
    duration: "3 يوم",
    members: "3-5 أعضاء",
    prize: "30000",
    date: "12 أغسطس",
    location: "حضوري",
    image: "/images/hackathon-amad.jpg",
    featured: false,
    description:
      "تتواصل الرحلة في أكبر هاكاثون بالتقنية المالية هاكاثون امد من الإنماء، بالشراكة مع أكاديمية طويق.",
  },
];

export const TEAM_ADS = [
  {
    id: "1",
    hackathonId: "2",
    hackathonTitle: "هاكاثون 1",
    category: "الذكاء الاصطناعي",
    date: "19 يوليو",
    location: "الرياض",
    prize: "3000",
    workDuration: "أسبوعين",
    attendance: "عن بعد \\ حضوري",
    members: [
      {
        number: 1,
        gender: "ذكر",
        role: "مطور واجهات",
        skills: ["React", "تحليل البيانات"],
      },
      {
        number: 2,
        gender: "أنثى",
        role: "مصممة UX",
        skills: ["Figma", "بحث المستخدم"],
      },
    ],
  },
  {
    id: "2",
    hackathonId: "1",
    hackathonTitle: "هاكاثون 2",
    category: "الصحة",
    date: "19 يوليو",
    location: "جدة",
    prize: "3000",
    workDuration: "أسبوع",
    attendance: "عن بعد \\ حضوري",
    members: [
      {
        number: 1,
        gender: "ذكر",
        role: "مهندس بيانات",
        skills: ["Python", "SQL"],
      },
    ],
  },
];

export const FILTER_OPTIONS = {
  gender: ["ذكر", "أنثى"],
  field: ["التقنية والذكاء الاصطناعي", "الصحة", "التصميم", "التقنية المالية"],
  skills: ["البرمجة وتحليل البيانات", "التصميم", "إدارة المشاريع", "التسويق"],
  region: ["الشرقية", "الرياض", "مكة المكرمة", "المدينة المنورة"],
  educationStatus: ["طالب ثانوي", "طالب جامعي", "خريج", "موظف"],
};