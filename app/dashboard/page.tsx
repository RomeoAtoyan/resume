import { getResumes } from "@/lib/db/get-resumes";
import React from "react";

const Page = async () => {
  const resumes = await getResumes();

  return (
    <div className="w-full flex items-start h-[calc(100vh-65px)]">
      <div className="h-full w-full grid grid-cols-6 p-6">
        {resumes?.map((resume) => (
          <div key={resume.id}>
            <h1>{resume.title}</h1>
            <div>{JSON.stringify(resume.data)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
