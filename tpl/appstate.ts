import { UIAttribs } from "../api";
import { App } from "../app";

/**
 * Component displaying app's stringified state.
 *
 * @param app
 * @param ui
 */
export function appState(app: App, ui: UIAttribs) {
    return ["p", "Current app state:",
        ["pre", ui.code, () => JSON.stringify(app.state.deref(), null, 2)]
    ];
}
