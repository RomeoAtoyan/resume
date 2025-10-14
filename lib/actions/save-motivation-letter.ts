export const saveMotivationLetter = async ({
  resumeId,
  analysis,
}: {
  resumeId: string;
  analysis: string;
}) => {
  if (!resumeId || !analysis) return;

  try {
    const res = await fetch(`/api/resumes/${resumeId}/motivation`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ analysis }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to save motivation letter:", errorData);
      throw new Error(errorData.error || "Failed to save motivation letter");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error saving motivation letter:", err);
    throw err;
  }
};
