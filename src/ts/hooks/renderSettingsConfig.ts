import { Listener } from "./index.ts";
import { Settings } from "../settings.ts";

const RenderSettingsConfig: Listener = {
    listen(): void {
        Hooks.on("renderSettingsConfig", (_config: unknown, html: HTMLElement) => {
            const moduleSettings = new Settings();

            for (const [key, menu] of game.settings.menus.entries()) {
                // NOTE: This is a hack to get the menu type since it is wrong in pf2e
                const m = menu as unknown as {
                    namespace: string;
                    restricted: boolean;
                };

                const formGroup = findFormGroup(html, m.namespace, `button[data-key="${key}"]`);

                addIconToMenuLabel({
                    isWorld: m.restricted,
                    label: formGroup?.querySelector("label"),
                });
            }

            for (const [key, setting] of game.settings.settings.entries()) {
                const formGroup = findFormGroup(html, setting.namespace, `[name="${key}"]`);
                if (!formGroup) continue;

                addIconToSettingLabel({
                    isWorld: setting.scope === "world",
                    label: formGroup.querySelector("label"),
                });

                if (moduleSettings.showNonDefaultIndicator) {
                    const settingValue = game.settings.get(setting.namespace, setting.key);

                    toggleChangedIndicator({
                        formGroup,
                        original: setting.default,
                        value: settingValue,
                        choices: setting.choices,
                    });
                }
            }
        });
    },
};

function findFormGroup(html: HTMLElement, namespace: string, selector: string): HTMLElement | null {
    return (
        html
            .querySelector(`.categories section[data-category="${namespace}"] ${selector}`)
            ?.closest<HTMLElement>(".form-group") ?? null
    );
}

function toggleChangedIndicator({
    formGroup,
    original,
    value,
    choices,
}: {
    formGroup: HTMLElement;
    original: any;
    value: any;
    choices?: Record<string, unknown>;
}) {
    const notes = formGroup.querySelector("p");

    // Fixes issue with some settings being null by default (why tho)
    if (original !== null) {
        // Fixes issues with selections not being the same type
        // eslint-disable-next-line eqeqeq
        if (original == value) {
            formGroup.classList.remove("obvious-settings-modified");
        } else {
            formGroup.classList.add("obvious-settings-modified");

            if (choices) {
                const originalChoice = choices[original];

                if (originalChoice) {
                    notes?.insertAdjacentHTML(
                        "beforeend",
                        `<p><b>Default</b>: ${game.i18n.localize(originalChoice as string)}</p>`,
                    );
                } else {
                    notes?.insertAdjacentHTML("beforeend", `<p><b>Default</b>: ${original}</p>`);
                }
            } else {
                notes?.insertAdjacentHTML("beforeend", `<p><b>Default</b>: ${original}</p>`);
            }
        }
    }
}

function addIconToSettingLabel({ isWorld, label }: { isWorld: boolean; label: Element | null | undefined }) {
    const icon = isWorld ? "<i class='fas fa-globe'></i>" : "<i class='fas fa-user'></i>";

    label?.insertAdjacentHTML("afterbegin", `${icon} `);
}

function addIconToMenuLabel({ isWorld, label }: { isWorld: boolean; label: Element | null | undefined }) {
    const icon = isWorld ? "<i class='fas fa-globe'></i>" : "<i class='fas fa-user'></i>";

    label?.insertAdjacentHTML("afterbegin", `${icon} `);
}

export { RenderSettingsConfig };
