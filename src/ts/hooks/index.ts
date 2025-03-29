import { Init } from "./init.ts";
import { Setup } from "./setup.ts";

interface Listener {
    listen(): void;
}

const HooksObviousSettings = {
    listen(): void {
        const listeners: Listener[] = [Init, Setup];

        for (const listener of listeners) {
            listener.listen();
        }
    },
};

export { HooksObviousSettings };
export type { Listener };
