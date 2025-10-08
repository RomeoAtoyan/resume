import CoursesAndCertificates from "./courses-certificates";
import Education from "./education";
import Language from "./language";
import PersonalInfo from "./personal-info";
import References from "./references";
import Summary from "./summary";
import WorkExperience from "./work-experience";

export const SectionBox = ({
  activeSection,
}: {
  activeSection: { id: string; title: string };
}) => {
  switch (activeSection.id) {
    case "personal-info":
      return <PersonalInfo />;
    case "summary":
      return <Summary />;
    case "work-experience":
      return <WorkExperience />;
    case "education":
      return <Education />;
    case "language":
      return <Language />;
    case "courses-certificates":
      return <CoursesAndCertificates />;
    case "references":
      return <References />;
    case "more-details":
      return <div>123</div>;
    default:
      return <div className="p-6 text-gray-500">Select a section</div>;
  }
};
