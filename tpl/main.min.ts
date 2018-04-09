import { AppContext } from "../api";

export function main(ctx: AppContext) {
    return ["div", ctx.ui.root, ["h1", "Welcome to @thi.ng/hdom"]];
}
