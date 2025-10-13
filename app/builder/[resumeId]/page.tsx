import Sections from "@/components/sections";
import { SectionBox } from "@/sections/section-box";
import { ResumeCanvas } from "@/components/resume-canvas-client";


const Page = async ({ params }: { params: { resumeId: string } }) => {
  const { resumeId } = await params;
  return (
    <div className="w-full flex items-start h-[calc(100vh-65px)]">
      <div className="max-w-xs w-full h-full">
        <Sections />
      </div>

      <div className="max-w-lg w-full h-full overflow-y-auto border-l border-r border-b border-gray-200">
        <SectionBox resumeId={resumeId} />
      </div>

      {/* <div className="w-full h-full">
        <ResumeCanvas />
      </div> */}
    </div>
  );
};

export default Page;
