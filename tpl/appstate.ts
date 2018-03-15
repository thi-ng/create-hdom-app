import { App } from "../app";

export function appState(app: App, ui: any) {
    return ["p", "Current app state:",
        ["pre", ui.code, () => JSON.stringify(app.state.deref(), null, 2)]
    ];
}