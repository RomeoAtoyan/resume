import { getUser } from "../auth/get-user";
import { prisma } from "../prisma";

export const getResume = async (resumeId: string) => {
  const user = await getUser();
  if (!user) {
    throw Error("Fuckk");
  }

  const resume = await prisma?.resume.findUnique({
    where: {
      userId: user.id,
      id: resumeId,
    },
  });

  return resume;
};
