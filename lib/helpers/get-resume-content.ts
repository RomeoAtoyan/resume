export const getResumeContent = () => {
  const content = document.querySelector(".resume-container")?.innerHTML;
  return content ?? "";
};