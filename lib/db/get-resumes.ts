import { getUser } from "../auth/get-user";

export const getResumes = async () => {
  const user = await getUser();
  if (!user) {
    throw Error("Fuckk");
  }

  const resumes = await prisma?.resume.findMany({
    where: {
      userId: user.id,
    },
  });

  return resumes;
};
