import { id as MODULE_ID } from "@static/module.json";

class Settings {
    // Settings keys
    SHOW_NON_DEFAULT_INDICATOR = "showNonDefaultIndicator";

    registerSettings(): void {
        game.settings.register(MODULE_ID, this.SHOW_NON_DEFAULT_INDICATOR, {
            name: "ObviousSettings.SettingShowNonDefaultIndicatorsName",
            hint: "ObviousSettings.SettingShowNonDefaultIndicatorsHint",
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
