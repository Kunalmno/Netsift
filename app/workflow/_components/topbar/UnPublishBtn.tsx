"use client";

import { UnpublishWorkflow } from "@/actions/workflows/unpublishWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon, UploadIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function UnPublishBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow UnPublished", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });
  return (
    <Button
      variant={"outline"}
      className="flex items=-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Unpublishing Workflow...", { id: workflowId }); //to remove or apply a time
        mutation.mutate(workflowId);
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-400" />
      Unpublish
    </Button>
  );
}
