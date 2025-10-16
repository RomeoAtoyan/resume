"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import React from "react";
import { useModalStore } from "@/store/use-modal-store";

const EmptyResumes = () => {
    const { openModal } = useModalStore();
  return (
    <Empty className="border border-dashed rounded-xl py-16 bg-gray-100">
      <EmptyHeader>
        <EmptyMedia>
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
            <FilePlus2 className="w-8 h-8" />
          </div>
        </EmptyMedia>
        <EmptyTitle>No resumes yet</EmptyTitle>
        <EmptyDescription>
          You haven’t created any resumes yet. Start building your first one now !
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => openModal("add-cv", "")} size="lg" className="mt-4">
          <FilePlus2 className="mr-2 h-5 w-5" />
          Create Resume
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyResumes;
