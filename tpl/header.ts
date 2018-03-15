import { UIAttribs } from "../api";

export function header(ui: UIAttribs, title: string) {
    return ["header", ui.header,
        ["img", ui.logo],
        ["h1", ui.title, title]];
}
