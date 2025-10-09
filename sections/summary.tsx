import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCvDataStore } from "@/store/use-cv-data-store";

const Summary = () => {
  const { setField } = useCvDataStore();
  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold text-gray-800">
            Professional Summary
          </Label>
          <p className="text-xs text-gray-500">
            Write a short introduction that highlights your experience,
            strengths, and career goals.
          </p>
        </div>

        <Textarea
          onChange={(e) => setField("summary", e.target.value)}
          placeholder="E.g. Passionate front-end developer with 5+ years of experience building responsive web applications..."
          className="min-h-[120px] resize-none"
        />
      </div>
    </SectionBoxWrapper>
  );
};

export default Summary;
