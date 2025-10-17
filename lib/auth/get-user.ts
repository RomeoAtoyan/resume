import { prisma } from "@/lib/prisma";
import { getSessionServer } from "@/lib/auth/get-session-server";
import { redirect } from "next/navigation";

interface GetUserProps {
  redirectTo?: string;
}

export const getUser = async ({ redirectTo }: GetUserProps = {}) => {
  const session = await getSessionServer();
  if (!session?.user?.id) {
    if (redirectTo) redirect(redirectTo);
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user && redirectTo) {
    redirect(redirectTo);
  }

  return user;
};
