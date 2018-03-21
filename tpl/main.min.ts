import { UIAttribs } from "../api";
import { App } from "../app";

export function main(_: App, ui: UIAttribs) {
    return ["div", ui.root, ["h1", "Welcome to @thi.ng/hdom"]];
}
