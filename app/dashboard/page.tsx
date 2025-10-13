import { Button } from "@/components/ui/button";
import { getResumes } from "@/lib/db/get-resumes";
import { Plus } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const resumes = await getResumes();
  return (
    <div className="w-full flex flex-col items-start h-[calc(100vh-65px)]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between p-6 w-full">
          <div className="max-w-xl">
            <h1 className="text-3xl font-semibold">Create a resume</h1>
            <p>Create your own custom resume using AI</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-500/90" size={"lg"}>
            <Plus />
            Create Resume
          </Button>
        </div>

        <section className="p-6">
          <h3 className="text-xl font-semibold mb-4">Templates</h3>

          <div className="grid grid-cols-5 gap-6">
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-200"></div>
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-200"></div>
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-200"></div>
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-200"></div>
            <div className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-200"></div>
          </div>
        </section>

        <section className="p-6 w-full">
          <h3 className="text-xl font-semibold mb-4">My Resumes</h3>

          <div className="grid grid-cols-5 gap-6">
            {resumes?.map((resume) => (
              <Link
                href={`/builder/${resume.id}`}
                key={resume.id}
                className="aspect-[2/4] w-full max-w-[250px] max-h-[300px] bg-gray-200 flex items-center justify-center"
              >
                {resume.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
