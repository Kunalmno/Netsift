import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BrainIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";
export const ExtractDataWithAITask = {
    type: TaskType.EXTRACT_DATA_WITH_AI,
    label: "Extract Data with Ai",
    icon: (props) => (
        <BrainIcon className="stroke-rose-400" {...props} />
    ),
    isEntryPoint: false,
    credits: 4,
    inputs: [
        {
            name: "content",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Credentials",
            type: TaskParamType.CREDENTIAL,
            required: true,
        },
        {
            name: "Prompt",
            type: TaskParamType.STRING,
            required: true,
            variant:"textarea",
        },
    ]as const,
    outputs: [
        {
            name: "Extracted data",
            type: TaskParamType.STRING,
        },
    ] as const,
} satisfies WorkflowTask;