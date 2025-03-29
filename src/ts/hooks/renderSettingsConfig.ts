import { Listener } from "./index.ts";

const RenderSettingsConfig: Listener = {
    listen(): void {
        Hooks.on(
            "renderSettingsConfig",
            (_config: any, _html: any, _data: any) => {
                // const moduleSettings = new Settings();

                for (const menu of game.settings.menus.values()) {
                    console.log("menu", menu);
                }

                for (const setting of game.settings.settings.values()) {
                    console.log("setting", setting);
                    break;
                }

                // const settingsData = data as SettingsData;
                // settingsData.categories = settingsData.categories.map(
                //     (category: Category) => {
                //         const section = html.find(
                //             `section.category[data-category="${category.id}"]`,
                //         );

                //         category.menus = category.menus.map(
                //             (menu: MenuData) => {
                //                 menu.name = game.i18n.localize(menu.name);

                //                 addIconToLabel({
                //                     identifier: menu.key,
                //                     isWorld: menu.restricted,
                //                     categorySection: section,
                //                 });

                //                 return menu;
                //             },
                //         );

                //         category.settings = category.settings.map(
                //             (setting: SettingData) => {
                //                 setting.name = game.i18n.localize(setting.name);

                //                 addIconToLabel({
                //                     identifier: setting.id,
                //                     isWorld: setting.scope === "world",
                //                     categorySection: section,
                //                 });

                //                 if (moduleSettings.showNonDefaultIndicator) {
                //                     toggleChangedIndicator({
                //                         identifier: setting.id,
                //                         original: setting.default,
                //                         value: setting.value,
                //                         categorySection: section,
                //                     });
                //                 }

                //                 return setting;
                //             },
                //         );

                //         return category;
                //     },
                // );
            },
        );
    },
};

function toggleChangedIndicator({
    identifier,
    original,
    value,
    categorySection,
}: {
    identifier: string;
    original: any;
    value: any;
    categorySection: JQuery<HTMLElement>;
}) {
    const formGroup = categorySection
        .find(`[name="${identifier}"], [data-key="${identifier}"]`)
        .closest(".form-group");
    const notes = formGroup.find("p");

    // Fixes issue with some settings being null by default (why tho)
    if (original !== null) {
        // Fixes issues with selections not being the same type
        // eslint-disable-next-line eqeqeq
        if (original == value) {
            formGroup.removeClass("obvious-settings-modified");
        } else {
            formGroup.addClass("obvious-settings-modified");
            notes.append(`<p><b>Default</b>: ${original}`);
        }
    }
}

function addIconToLabel({
    identifier,
    isWorld,
    categorySection,
}: {
    identifier: string;
    isWorld: boolean;
    categorySection: JQuery<HTMLElement>;
}) {
    const icon = isWorld ? "🌎" : "👤";
    const label = categorySection
        .find(`[name="${identifier}"], [data-key="${identifier}"]`)
        .closest(".form-group")
        .find("label");
    label.prepend(`${icon} `);
}

export { RenderSettingsConfig };
