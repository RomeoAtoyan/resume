import { getUser } from "../auth/get-user";
import { prisma } from "../prisma";

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
