import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen absolute inset-0 z-10">
      <Spinner strokeWidth={1} className="size-32 text-purple-500" />
    </div>
  );
}
