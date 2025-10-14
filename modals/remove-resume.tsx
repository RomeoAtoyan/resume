"use client";

import { Button } from "@/components/ui/button";
import { removeResume } from "@/lib/actions/remove-resume";
import { useModalStore } from "@/store/use-modal-store";

const RemoveResume = () => {
  const { close } = useModalStore();
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
        <Button onClick={() => removeResume("123")} variant="destructive">Yes, Delete</Button>
      </div>
    </div>
  );
};

export default RemoveResume;
