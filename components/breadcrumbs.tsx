"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { handleDownloadResumePDF } from "@/lib/actions/download-pdf-resume";
import { getResumeContent } from "@/lib/helpers/get-resume-content";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { useDownloadStore } from "@/store/use-download-store";
import { useModalStore } from "@/store/use-modal-store";
import { Ellipsis, File, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { DownloadButton } from "./download-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Breadcrumbs = () => {
  const { openModal } = useModalStore();
  const { setDownloading, downloading } = useDownloadStore();
  const { title } = useCvDataStore();

  return (
    <div className="px-6 py-2 border-b flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Resume</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-end gap-2">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger
              onClick={() => openModal("add-cv", "")}
              className="bg-blue-400 hover:bg-blue-400/80 py-1.5 px-3 rounded-md"
            >
              <Plus color="white" />
              <TooltipContent className="bg-white font-semibold border text-black">
                Create a new CV
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <DownloadButton
          downloading={downloading}
          downloadKey="resume"
          handleDownload={() =>
            handleDownloadResumePDF({
              html: getResumeContent(),
              setDownloading,
            })
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="border">
              <Ellipsis className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                openModal("change-resume-template", "");
              }}
            >
              <File />
              Edit template
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer hover:!text-red-500 hover:!bg-red-50"
              onClick={() => {
                openModal("remove-resume", "Delete Resume?");
              }}
            >
              <Trash />
              Delete resume
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
