import { Listener } from "./index.ts";
import { Settings } from "../settings.ts";

const RenderSettingsConfig: Listener = {
    listen(): void {
        Hooks.on(
            "renderSettingsConfig",
            (_config: any, html: any, _data: any) => {
                const moduleSettings = new Settings();
                const $html = $(html);

                for (const entry of game.settings.menus.entries()) {
                    const [key, menu] = entry;

                    // NOTE: This is a hack to get the menu type since it is wrong in pf2e
                    const m = menu as unknown as {
                        namespace: string;
                        restricted: boolean;
                    };

                    const section = findSectionForSetting({
                        $html,
                        namespace: m.namespace,
                    });
                    if (!section) continue;

                    const menuLabel = findMenuLabel({ section, key });
                    if (!menuLabel) continue;

                    addIconToMenuLabel({
                        isWorld: m.restricted,
                        label: menuLabel,
                    });
                }

                for (const entry of game.settings.settings.entries()) {
                    const [key, setting] = entry;
                    const section = findSectionForSetting({
                        $html,
                        namespace: setting.namespace,
                    });
                    if (!section) continue;

                    const settingLabel = findSettingLabel({
                        section,
                        identifier: key,
                    });
                    if (!settingLabel) continue;

                    addIconToSettingLabel({
                        isWorld: setting.scope === "world",
                        label: settingLabel,
                    });

                    if (moduleSettings.showNonDefaultIndicator) {
                        const settingValue = game.settings.get(
                            setting.namespace,
                            setting.key,
                        );

                        toggleChangedIndicator({
                            identifier: key,
                            original: setting.default,
                            value: settingValue,
                            categorySection: section,
                            choices: setting.choices,
                        });
                    }
                }
            },
        );
    },
};

function findSectionForSetting({
    $html,
    namespace,
}: {
    $html: JQuery<HTMLElement>;
    namespace: string;
}): JQuery<HTMLElement> | null {
    const section = $html.find(
        `.categories section[data-category="${namespace}"]`,
    );

    return section;
}

function toggleChangedIndicator({
    identifier,
    original,
    value,
    categorySection,
    choices,
}: {
    identifier: string;
    original: any;
    value: any;
    categorySection: JQuery<HTMLElement>;
    choices?: Record<string, unknown>;
}) {
    const formGroup = categorySection
        .find(`[name="${identifier}"]`)
        .closest(".form-group");

    if (!formGroup.length) return;

    const notes = formGroup.find("p");

    // Fixes issue with some settings being null by default (why tho)
    if (original !== null) {
        // Fixes issues with selections not being the same type
        // eslint-disable-next-line eqeqeq
        if (original == value) {
            formGroup.removeClass("obvious-settings-modified");
        } else {
            formGroup.addClass("obvious-settings-modified");

            if (choices) {
                const originalChoice = choices[original];

                if (originalChoice) {
                    notes.append(
                        `<p><b>Default</b>: ${game.i18n.localize(
                            originalChoice as string,
                        )}</p>`,
                    );
                } else {
                    notes.append(`<p><b>Default</b>: ${original}</p>`);
                }
            } else {
                notes.append(`<p><b>Default</b>: ${original}</p>`);
            }
        }
    }
}

function findSettingLabel({
    section,
    identifier,
}: {
    section: JQuery<HTMLElement>;
    identifier: string;
}): JQuery<HTMLElement> | null {
    const label = section
        .find(`[name="${identifier}"]`)
        .closest(".form-group")
        .find("label");

    return label;
}

function addIconToSettingLabel({
    isWorld,
    label,
}: {
    isWorld: boolean;
    label: JQuery<HTMLElement>;
}) {
    const icon = isWorld
        ? "<i class='fas fa-globe'></i>"
        : "<i class='fas fa-user'></i>";

    label.prepend(`${icon} `);
}

function findMenuLabel({
    section,
    key,
}: {
    section: JQuery<HTMLElement>;
    key: string;
}): JQuery<HTMLElement> | null {
    const label = section
        .find(`button[data-key="${key}"]`)
        .closest(".form-group")
        .find("label");

    return label;
}

function addIconToMenuLabel({
    isWorld,
    label,
}: {
    isWorld: boolean;
    label: JQuery<HTMLElement>;
}) {
    const icon = isWorld
        ? "<i class='fas fa-globe'></i>"
        : "<i class='fas fa-user'></i>";

    label.prepend(`${icon} `);
}

export { RenderSettingsConfig };
