import Sections from "@/components/sections";
import { SectionBox } from "@/sections/section-box";
import { ResumeCanvas } from "@/components/resume-canvas-client";
import { getResume } from "@/lib/db/get-resume";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const Page = async ({ params }: { params: Promise<{ resumeId: string }> }) => {
  const { resumeId } = await params;
  const resume = await getResume(resumeId);

  if (!resume) {
    redirect(ROUTES.DASHBOARD);
  }

  return (
    <div className="w-full h-[calc(100vh-65px)] flex flex-col">
      <Breadcrumbs />
      <div className="flex-1 flex items-start overflow-hidden">
        <div className="max-w-xs w-full h-full">
          <Sections />
        </div>

        <div className="max-w-lg w-full h-full overflow-y-auto border-l border-r border-b border-gray-200">
          <SectionBox resume={resume} />
        </div>

        <div className="w-full h-full">
          <ResumeCanvas />
        </div>
      </div>
    </div>
  );
};

export default Page;
