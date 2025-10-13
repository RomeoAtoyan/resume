"use client";

import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useModalStore } from "@/store/use-modal-store";

const DashboardHero = () => {
  const { openModal } = useModalStore();
  return (
    <div className="flex items-center justify-between p-6 w-full">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold">Create a resume</h1>
        <p>Create your own custom resume using AI</p>
      </div>
      <Button
        onClick={() => openModal("add-cv", "")}
        className="bg-blue-500 hover:bg-blue-500/90"
        size={"lg"}
      >
        <Plus />
        Create Resume
      </Button>
    </div>
  );
};

export default DashboardHero;
