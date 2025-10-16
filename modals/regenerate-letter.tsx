"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { deleteMotivationLetter } from "@/lib/actions/delete-motivation-letter";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { useModalStore } from "@/store/use-modal-store";
import React, { useState } from "react";

const RegenerateLetter = () => {
  const { close } = useModalStore();
  const { setField, resumeId } = useCvDataStore();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <p>
        Regenerating your motivation letter means that you lose your previous
        motivation letter.
      </p>

      <Separator className="my-6" />

      <div className="flex items-center justify-end">
        <Button
          onClick={() =>
            deleteMotivationLetter({
              close,
              resumeId,
              setField,
              setLoading,
            })
          }
          variant="destructive"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              Deleting
              <Spinner className="size-6" />
            </div>
          ) : (
            "Yes, delete and regenerate"
          )}
        </Button>
      </div>
    </div>
  );
};

export default RegenerateLetter;
