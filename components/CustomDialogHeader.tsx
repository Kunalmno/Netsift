"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface Props {
    title?: string;
    subTitle?: string;
    icon?: LucideIcon;

    iconClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}

function CustomDialogHeader(props: Props) {
    return (
        <DialogHeader>
            <DialogTitle asChild>
                <div className="flex flex-col items-center gap-2 mb-2">
                    {props.icon && (<props.icon
                        size={30}
                        className={cn("stoke-primary", props.iconClassName)} />
                    )}
                    {props.title && (<p className={cn("text-xl text-primary", props.titleClassName)}>
                        {props.title}
                    </p>
                    )}
                    {props.subTitle && (<p className={cn("text-sm text-muted-foreground", props.subtitleClassName)}>
                        {props.title}
                    </p>
                    )}
                </div>

            </DialogTitle>
            <Separator />
        </DialogHeader>
    );
}

export default CustomDialogHeader;