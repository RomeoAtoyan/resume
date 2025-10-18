import { ROUTES } from "@/constants/routes";
import { getUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getUser();

  if (!user) {
    redirect(ROUTES.AUTH);
  }

  if (user) {
    redirect(ROUTES.DASHBOARD);
  }
};

export default Page;
