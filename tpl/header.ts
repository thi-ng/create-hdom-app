import { AppContext } from "../api";

export function header(ctx: AppContext, title: string) {
    return ["header", ctx.ui.header,
        ["img", ctx.ui.logo],
        ["h1", ctx.ui.title, title]];
}
