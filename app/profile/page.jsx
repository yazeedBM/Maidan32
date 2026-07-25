import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm";

export const metadata = { title: "الملف الشخصي" };

export default function ProfilePage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="flex-1 bg-surface-blue pb-20 pt-28">
        <div className="container-site max-w-3xl">
          <h1 className="mb-8 text-center text-3xl font-extrabold text-primary sm:text-4xl">
            الملف الشخصي
          </h1>
          <ProfileForm />
        </div>
      </main>
      <Footer variant="light" />
    </>
  );
}