import Sections from "@/components/sections";
import { SectionBox } from "@/sections/section-box";
import { ResumeCanvas } from "@/components/resume-canvas-client";
import { getResume } from "@/lib/db/get-resume";
import { Breadcrumbs } from "@/components/breadcrumbs";

const Page = async ({ params }: { params: { resumeId: string } }) => {
  const { resumeId } = await params;
  const resume = await getResume(resumeId);
  return (
    <div className="w-full h-[calc(100vh-65px)] flex flex-col">
      <Breadcrumbs title={resume?.title ?? "New Resume"} />
      <div className="flex-1 flex items-start overflow-hidden">
        <div className="max-w-xs w-full h-full">
          <Sections />
        </div>

        <div className="max-w-lg w-full h-full overflow-y-auto border-l border-r border-b border-gray-200">
          <SectionBox resumeId={resumeId} />
        </div>

        <div className="w-full h-full">
          <ResumeCanvas />
        </div>
      </div>
    </div>
  );
};

export default Page;
