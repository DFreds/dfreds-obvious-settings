import "../styles/style.scss"; // Keep or else vite will not include this
import { DataField } from "types/foundry/common/data/fields.js";
import { Settings } from "./settings.ts";

Hooks.once("init", () => {
    new Settings().registerSettings();
});

Hooks.on(
    "renderSettingsConfig",
    function (
        _config: SettingsConfig,
        html: JQuery<HTMLElement>,
        data: FormApplicationData<object>,
    ) {
        const moduleSettings = new Settings();

        const settingsData = data as SettingsData;
        settingsData.categories = settingsData.categories.map(
            (category: Category) => {
                const section = html.find(
                    `section.category[data-category="${category.id}"]`,
                );

                category.menus = category.menus.map((menu: MenuData) => {
                    menu.name = game.i18n.localize(menu.name);

                    addIconToLabel({
                        identifier: menu.key,
                        isWorld: menu.restricted,
                        categorySection: section,
                    });

                    return menu;
                });

                category.settings = category.settings.map(
                    (setting: SettingData) => {
                        setting.name = game.i18n.localize(setting.name);

                        addIconToLabel({
                            identifier: setting.id,
                            isWorld: setting.scope === "world",
                            categorySection: section,
                        });

                        if (moduleSettings.showNonDefaultIndicator) {
                            toggleChangedIndicator({
                                identifier: setting.id,
                                original: setting.default,
                                value: setting.value,
                                categorySection: section,
                            });
                        }

                        return setting;
                    },
                );

                return category;
            },
        );
    },
);

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
    if (original) {
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

type SettingsData = {
    canConfigure: boolean;
    categories: Category[];
    categoryTemplate: string;
    submitButton: boolean;
    total: number;
    user: User;
};

type Category = {
    count: number;
    id: string;
    menus: MenuData[];
    settings: SettingData[];
    title: string;
};

type MenuData = {
    hint: string;
    icon: string;
    key: string;
    label: string;
    name: string;
    namespace: string;
    restricted: boolean;
    type: any;
};

type SettingData = {
    config: boolean;
    dataField: DataField;
    default: any;
    filePickerType: any;
    hint: string;
    id: string;
    input: any;
    isCheckbox: boolean;
    isNumber: boolean;
    isRange: boolean;
    isSelect: boolean;
    key: string;
    name: string;
    namespace: string;
    requiresReload: boolean;
    scope: string;
    type: any;
    value: any;
};
