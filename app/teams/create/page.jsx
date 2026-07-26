import CreateTeamAdForm from "@/components/CreateTeamAdForm";

export const metadata = { title: "أنشئ إعلان" };

/**
 * "أنشئ إعلان" route.
 *
 * The form itself is a client component (components/CreateTeamAdForm.jsx).
 * The `?hackathon=` query string is read here, on the server, and handed down
 * as a prop — this is what keeps the build from failing: reading it in the
 * client with useSearchParams() requires a Suspense boundary during
 * prerendering, which would blank the page on first paint.
 */
export default function CreateTeamAdPage({ searchParams }) {
  const hackathonId = searchParams?.hackathon ?? "1";
  return <CreateTeamAdForm hackathonId={hackathonId} />;
}
