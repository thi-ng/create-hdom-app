export function link(onclick: (e: Event) => void, attribs: any, body: any) {
    return ["a",
        {
            ...attribs,
            onclick: (e) => {
                e.preventDefault();
                onclick(e);
            }
        },
        body];
}
