export function header(ui: any, title: string) {
    return ["header", ui.header,
        ["img", ui.logo],
        ["h1", ui.title, title]];
}
