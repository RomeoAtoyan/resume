"use client";

import { useIsInBuilder } from "@/hooks/use-is-in-builder";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { CheckCircle, X } from "lucide-react";
import moment from "moment";
import React from "react";
import { Spinner } from "./ui/spinner";

const AutoSaveStatus = () => {
  const { saveStatus, lastSaved } = useCvDataStore();
  const isInBuilder = useIsInBuilder();

  const formattedTime = React.useMemo(() => {
    if (!lastSaved) return null;
    const date = moment(lastSaved);
    return date.calendar(null, {
      sameDay: "[today at] HH:mm",
      lastDay: "[yesterday at] HH:mm",
      lastWeek: "[last] dddd [at] HH:mm",
      sameElse: "DD MMM YYYY [at] HH:mm",
    });
  }, [lastSaved]);

  if (!isInBuilder) return null;

  if (saveStatus === "saving") {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <Spinner />
        <span>Saving your resume...</span>
      </div>
    );
  }

  if (saveStatus === "error") {
    return (
      <div className="flex items-center gap-1 text-sm text-red-500">
        <X className="h-4 w-4" />
        <span>Save failed</span>
      </div>
    );
  }

  if (saveStatus === "saved" && formattedTime) {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <CheckCircle color="green" size={16} />
        <span>Last saved {formattedTime}</span>
      </div>
    );
  }

  return null;
};

export default AutoSaveStatus;
