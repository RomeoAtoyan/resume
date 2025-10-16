"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import clsx from "clsx";
import { TemplateTypes } from "@/store/types/cv-data-types";
import Image from "next/image";

type Template = {
  id: string;
  name: string;
  thumbnail?: string;
};

interface TemplatesCarouselProps {
  templates: Template[];
  selectedTemplate: TemplateTypes;
  setSelectedTemplate: (template: TemplateTypes) => void;
}

const TemplatesCarousel: React.FC<TemplatesCarouselProps> = ({
  templates,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  return (
    <div className="w-full space-y-4">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full space-y-4"
      >
        <CarouselContent>
          {templates.map((t) => (
            <CarouselItem
              key={t.id}
              className="basis-[160px] pl-4"
              onClick={() => setSelectedTemplate(t.id as TemplateTypes)}
            >
              <div
                className={clsx(
                  "relative cursor-pointer rounded-xl border overflow-hidden transition-all group",
                  selectedTemplate === t.id
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-200 hover:border-gray-400"
                )}
              >
                <div className="relative aspect-[3/4] bg-gray-100">
                  {t.thumbnail ? (
                    <Image
                      src={t.thumbnail}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                      No preview
                    </div>
                  )}
                </div>
                <div className="p-2 text-center text-sm font-medium text-gray-700">
                  {t.name}
                </div>
                {selectedTemplate === t.id && (
                  <div className="absolute inset-0 bg-blue-500/10 ring-2 ring-blue-500 rounded-xl pointer-events-none" />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-3 pt-4 pb-6">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default TemplatesCarousel;
