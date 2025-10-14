"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import MotivationLetter from "@/modals/motivation-letter";
import { useCanvasStore } from "@/store/use-canvas-store";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const GlobalCanvas = () => {
  const { isOpen, close, id, title, loading, disableClose } = useCanvasStore();
  const { motivationLetterText } = useCvDataStore();

  const content = () => {
    switch (id) {
      case "motivation-letter":
        return (
          <MotivationLetter loading={loading} response={motivationLetterText} />
        );
      default:
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        disableClose={disableClose}
        className="bg-inherit w-[794px] h-[1123px] max-w-full max-h-[calc(100vh-4rem)] overflow-y-auto rounded-xl p-6 shadow-lg mx-auto"
      >
        {title ? (
          <DialogTitle>{title}</DialogTitle>
        ) : (
          <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden>
        )}

        {content()}
      </DialogContent>
    </Dialog>
  );
};

export default GlobalCanvas;
