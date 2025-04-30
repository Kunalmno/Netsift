import { Log, LogCollector, LogFunction, loglevel, LogLevels } from "@/types/log";

export function createLogCollector(): LogCollector {
    const logs: Log[] = [];
    const getAll = () => logs;

    const logFunctions = {} as Record<loglevel, LogFunction>;
    LogLevels.forEach(
        (level) =>
            (logFunctions[level] =(message: string)=> {
                logs.push({message, level, timestamp: new Date()});
            })
    );
    return {
        getAll,
       ...logFunctions,
    };
}