"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { removeResume } from "@/lib/actions/resume/remove-resume";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { useModalStore } from "@/store/use-modal-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RemoveResume = () => {
  const { close } = useModalStore();
  const { resumeId } = useCvDataStore();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This action will permanently remove your resume. Once deleted, it{" "}
            <span className="font-semibold text-destructive">
              cannot be restored
            </span>
            .
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button onClick={() => close()} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={() =>
            removeResume({
              resumeId: resumeId!,
              close,
              router,
              setLoading,
            })
          }
          variant="destructive"
        >
          {loading ? <Spinner /> : "Yes, Delete"}
        </Button>
      </div>
    </div>
  );
};

export default RemoveResume;
