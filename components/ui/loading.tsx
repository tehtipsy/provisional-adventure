import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex justify-center pt-4">
      <Skeleton className="h-6 w-40 justify-center" />
    </div>
  );
}
