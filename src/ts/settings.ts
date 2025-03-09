import { MODULE_ID } from "./constants.ts";

class Settings {
    // Settings keys
    SHOW_NON_DEFAULT_INDICATOR = "showNonDefaultIndicator";

    register(): void {
        game.settings.register(MODULE_ID, this.SHOW_NON_DEFAULT_INDICATOR, {
            name: EN_JSON.ObviousSettings.SettingShowNonDefaultIndicatorsName,
            hint: EN_JSON.ObviousSettings.SettingShowNonDefaultIndicatorsHint,
            scope: "client",
            config: true,
            default: true,
            type: Boolean,
        });
    }

    get showNonDefaultIndicator(): Boolean {
        return game.settings.get(
            MODULE_ID,
            this.SHOW_NON_DEFAULT_INDICATOR,
        ) as Boolean;
    }
}

export { Settings };
