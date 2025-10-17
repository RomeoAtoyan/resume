export const updateUser = async ({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) => {
  try {
    const res = await fetch(`/api/account/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
