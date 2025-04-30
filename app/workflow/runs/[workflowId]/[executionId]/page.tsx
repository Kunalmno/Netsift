import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/GetWorkflowExecutionWithPhases";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

export default function ExecutionViewerPage({
    params,
}:{params: {
    executionId : string;
    workflowId: string;
};
}){
    return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
        <Topbar
            workflowId={params.workflowId}
            title="Workflow Run Details"
            subtitle={`Run ID: ${params.executionId}`}
            hideButtons
        />
        <section className="flex h-full overflow-auto">
            <Suspense 
                fallback={
                    <div>
                        <Loader2Icon className="h-10 w-10 animate-spin stroke-primary"/>
                    </div>
                }
            >
                <ExecutionViewerWrapper executionId={params.executionId}/>
            </Suspense>
        </section>
        {/*footer section*/}
        <Separator />
            <footer className="flex items-center justify-between p-2">
                <Logo iconSize={16} fontSize="text-xl" />
                <ModeToggle />
            </footer>
    </div>
    );
}

async function ExecutionViewerWrapper({
    executionId,
}:{
    executionId: string;
}) {
    const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
    if(!workflowExecution){
        return <div> Not found </div>;
    }
    return <ExecutionViewer initialData={workflowExecution} />;
}