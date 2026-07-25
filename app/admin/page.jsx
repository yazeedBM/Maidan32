"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminHackathonsClient from "@/components/AdminHackathonsClient";
import AdminTeamsClient from "@/components/AdminTeamsClient";

const TABS = [
  { key: "hackathons", label: "إدارة الهاكاثونات" },
  { key: "teams", label: "إدارة الفرق" },
];

export default function AdminPage() {
  const [tab, setTab] = useState("hackathons");

  return (
    <>
      <Navbar variant="light" />
      <main className="flex-1 bg-surface-muted pb-20 pt-28">
        <div className="container-site">
          <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">
            لوحة التحكم
          </h1>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="أقسام لوحة التحكم"
            className="mt-8 flex gap-2 border-b border-surface-field"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`-mb-px rounded-t-field px-5 py-3 text-sm font-bold transition-colors ${
                  tab === t.key
                    ? "border-b-2 border-accent bg-white text-accent"
                    : "text-ink-soft hover:text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Panels */}
          <div className="mt-8">
            {tab === "hackathons" ? (
              <AdminHackathonsClient />
            ) : (
              <AdminTeamsClient />
            )}
          </div>
        </div>
      </main>
      <Footer variant="dark" />
    </>
  );
}