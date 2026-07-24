function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

// Turns a Prisma User row (optionally with `experience` included) into the
// shape the frontend already expects: { _id, fullName, email, phone, role, profile: {...} }
export function serializeUser(u, { includeContact = true } = {}) {
  if (!u) return null;
  const base = {
    _id: u.id,
    fullName: u.fullName,
    role: u.role,
  };
  if (includeContact) {
    base.email = u.email;
    base.phone = u.phone;
  }
  if (u.bio !== undefined) {
    base.profile = {
      bio: u.bio,
      skills: safeParse(u.skills, []),
      links: safeParse(u.links, { github: "", linkedin: "", portfolio: "" }),
      experience: (u.experience || []).map((e) => ({
        _id: e.id,
        title: e.title,
        description: e.description,
        year: e.year,
      })),
    };
    base.createdAt = u.createdAt;
  }
  return base;
}

export function serializeHackathon(h) {
  if (!h) return null;
  return {
    ...h,
    _id: h.id,
    fields: safeParse(h.fields, []),
    date: h.date instanceof Date ? h.date.toISOString() : h.date,
  };
}

// team must have `members: [{ user, ... }]` included (via Prisma include)
export function serializeTeam(t, { currentUserId } = {}) {
  if (!t) return null;
  const isMember = !!currentUserId && t.members.some((m) => m.userId === currentUserId);
  return {
    _id: t.id,
    name: t.name,
    description: t.description,
    skillsNeeded: safeParse(t.skillsNeeded, []),
    maxMembers: t.maxMembers,
    hackathon: t.hackathon
      ? { _id: t.hackathon.id, title: t.hackathon.title, date: t.hackathon.date, coverImage: t.hackathon.coverImage }
      : undefined,
    hackathonId: t.hackathonId,
    createdAt: t.createdAt,
    isMember,
    members: t.members.map((m) => serializeUser(m.user, { includeContact: isMember })),
  };
}
