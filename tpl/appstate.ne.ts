import { AppContext } from "../api";

/**
 * Component displaying app's stringified state.
 *
 * @param ctx
 * @param ui
 */
export function appState(ctx: AppContext) {
    return ["p", "Current app state:",
        ["pre", ctx.ui.code, () => JSON.stringify(ctx.state.deref(), null, 2)]
    ];
}
