import { MODULE_ID } from "./constants.ts";

class Settings {
    // Settings keys
    SHOW_NON_DEFAULT_INDICATOR = "showNonDefaultIndicator";

    register(): void {
        game.settings.register(MODULE_ID, this.SHOW_NON_DEFAULT_INDICATOR, {
            name: "ObviousSettings.Setting.ShowNonDefaultIndicatorsName",
            hint: "ObviousSettings.Setting.ShowNonDefaultIndicatorsHint",
            scope: "client",
            config: true,
            default: true,
            type: Boolean,
        });
    }

    get showNonDefaultIndicator(): boolean {
        return game.settings.get(
            MODULE_ID,
            this.SHOW_NON_DEFAULT_INDICATOR,
        ) as unknown as boolean;
    }
}

export { Settings };
