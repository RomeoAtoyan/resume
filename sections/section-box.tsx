import Education from "./education";
import PersonalInfo from "./personal-info";
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
      return <div>123</div>;
    case "courses-certificates":
      return <div>123</div>;
    case "more-details":
      return <div>123</div>;
    default:
      return <div className="p-6 text-gray-500">Select a section</div>;
  }
};
