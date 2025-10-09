import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getSessionServer() {
  return await getServerSession(authOptions);
}