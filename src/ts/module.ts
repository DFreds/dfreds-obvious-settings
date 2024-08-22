import { id as MODULE_ID } from "@static/module.json";
import { libWrapper } from "@static/lib/shim.ts";

Hooks.once("setup", () => {
    libWrapper.register(
        MODULE_ID,
        "SettingsConfig.prototype._prepareCategoryData",
        function (
            this: SettingsConfig,
            wrapped: () => CategoryData,
        ): CategoryData {
            const result = wrapped();

            result.categories = result.categories.map((category: Category) => {
                category.menus = category.menus.map((menu: MenuData) => {
                    const localized = game.i18n.localize(menu.name);
                    menu.name = `🌎 ${localized}`;
                    return menu;
                });

                category.settings = category.settings.map(
                    (setting: SettingData) => {
                        if (setting.scope === "world") {
                            setting.name = `🌎 ${setting.name}`;
                        } else {
                            setting.name = `👤 ${setting.name}`;
                        }

                        return setting;
                    },
                );

                return category;
            });
            return result;
        },
    );
});

type CategoryData = {
    categories: Category[];
};

type Category = {
    menus: MenuData[];
    settings: SettingData[];
};

type MenuData = {
    name: string;
};

type SettingData = {
    name: string;
    scope: string;
};
