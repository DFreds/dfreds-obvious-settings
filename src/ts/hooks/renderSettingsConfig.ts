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

                addScopeIcon(formGroup?.querySelector("label"), m.restricted);
            }

            for (const [key, setting] of game.settings.settings.entries()) {
                const formGroup = findFormGroup(html, setting.namespace, `[name="${key}"]`);
                if (!formGroup) continue;

                addScopeIcon(formGroup.querySelector("label"), setting.scope === "world");

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
    const hasNoDefault = original === null;
    if (hasNoDefault) return;

    // eslint-disable-next-line eqeqeq
    const isChanged = original != value;
    formGroup.classList.toggle("obvious-settings-modified", isChanged);
    if (!isChanged) return;

    const originalChoice = choices?.[original];
    const shown = originalChoice ? game.i18n.localize(originalChoice as string) : original;
    formGroup
        .querySelector("p")
        ?.insertAdjacentHTML("beforeend", `<p><b>${game.i18n.localize("ObviousSettings.Default")}</b>: ${shown}</p>`);
}

function addScopeIcon(label: Element | null | undefined, isWorld: boolean): void {
    label?.insertAdjacentHTML("afterbegin", `<i class="fas fa-${isWorld ? "globe" : "user"}"></i> `);
}

export { RenderSettingsConfig };
