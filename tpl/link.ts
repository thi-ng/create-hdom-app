import { AppContext } from "../api";

export function link(_: AppContext, attribs: any, onclick: (e: Event) => void, body: any) {
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
