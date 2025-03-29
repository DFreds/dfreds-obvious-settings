import { Init } from "./init.ts";
import { RenderSettingsConfig } from "./renderSettingsConfig.ts";
import { Setup } from "./setup.ts";

interface Listener {
    listen(): void;
}

const HooksObviousSettings = {
    listen(): void {
        const listeners: Listener[] = [Init, Setup, RenderSettingsConfig];

        for (const listener of listeners) {
            listener.listen();
        }
    },
};

export { HooksObviousSettings };
export type { Listener };
