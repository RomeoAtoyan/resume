import DashboardHero from "@/components/dashboard-hero";
import EmptyResumes from "@/components/empty-resumes";
import { getResumes } from "@/lib/db/get-resumes";
import Link from "next/link";

const Page = async () => {
  const resumes = await getResumes();
  return (
    <div className="w-full flex flex-col items-start h-[calc(100vh-65px)]">
      <div className="w-full max-w-6xl mx-auto">
        <DashboardHero />

        <section className="p-6">
          <h3 className="text-xl font-semibold mb-4">Templates</h3>

          <div className="grid grid-cols-5 gap-6">
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-100 rounded-md"></div>
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-100 rounded-md"></div>
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-100 rounded-md"></div>
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-100 rounded-md"></div>
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-100 rounded-md"></div>
          </div>
        </section>

        <section className="p-6 w-full">
          <h3 className="text-xl font-semibold mb-4">My Resumes</h3>

          {resumes && resumes.length > 0 ? (
            <div className="grid grid-cols-5 gap-6">
              {resumes.map((resume) => (
                <Link
                  href={`/builder/${resume.id}`}
                  key={resume.id}
                  className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-200 flex items-center justify-center rounded-lg hover:bg-gray-300 transition"
                >
                  <span className="text-center font-medium text-gray-700">
                    {resume.title || "Untitled Resume"}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyResumes />
          )}
        </section>
      </div>
    </div>
  );
};

export default Page;
