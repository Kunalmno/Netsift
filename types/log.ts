export const LogLevels = ["info", "error"] as const;
export type loglevel = (typeof LogLevels)[number];

export type LogFunction = (MessageChannel: string) => void;
export type Log = { message: string; level: loglevel; timestamp: Date};

export type LogCollector = {
    getAll(): Log[];
} & {
    [K in loglevel] : LogFunction;
}