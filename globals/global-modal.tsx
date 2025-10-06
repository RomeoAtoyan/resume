"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AddCV from "@/modals/add-cv";
import { useModalStore } from "@/store/use-modal-store";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const GlobalModal = () => {
  const { isOpen, close, id, title } = useModalStore();

  const content = () => {
    switch (id) {
      case "add-cv":
        return <AddCV />;
      default:
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="bg-inherit max-w-sm rounded lg:max-w-2xl">
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

export default GlobalModal;
