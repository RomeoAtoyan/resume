import { prisma } from "@/lib/prisma";
import { getSessionServer } from "@/lib/auth/get-session-server";

export const getUser = async () => {
  const session = await getSessionServer();
  if (!session) return null;

  const userId = session.user.id;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};
