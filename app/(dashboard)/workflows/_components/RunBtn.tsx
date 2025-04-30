"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { Button } from "@/components/ui/button";
import { Mutation, useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import { toast } from "sonner";

export default function RunBtn(
    {
        workflowId
    }:{workflowId:string}
){
    const mutation = useMutation({
        mutationFn:RunWorkflow,
        onSuccess: ()=>{
            toast.success("workflow started",{id: workflowId});
        },
        onError: ()=>{
            toast.error("Something went wrong",{id:workflowId});
        },
    });
    return (
        <Button 
            variant={"outline"} 
            size={"sm"} 
            className="flex items-center gap-2"
            disabled={mutation.isPending}
            onClick={() => {
                toast.loading("scheduling run...", {id:workflowId});//remove late or add a time limit
                mutation.mutate({
                    workflowId,
                });
            }}>
            <PlayIcon size={16} />Run
        </Button>
    );
}