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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleDownloadResumePDF } from "@/lib/actions/download-pdf-resume";
import { getResumeContent } from "@/lib/helpers/get-resume-content";
import { useDownloadStore } from "@/store/use-download-store";
import { useModalStore } from "@/store/use-modal-store";
import { Ellipsis, Trash } from "lucide-react";
import Link from "next/link";
import { DownloadButton } from "./download-button";

export const Breadcrumbs = ({ title }: { title: string }) => {
  const { openModal } = useModalStore();
  const { setDownloading, downloading } = useDownloadStore();

  return (
    <div className="px-6 py-2 border-b flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Resume</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-end gap-2">
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
              className="text-red-600 cursor-pointer"
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
