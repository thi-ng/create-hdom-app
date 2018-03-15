import { Event } from "@thi.ng/atom/api";
import { App } from "../app";

export function eventLink(app: App, event: Event, attribs: any, body: any) {
    return ["a",
        {
            ...attribs,
            onclick: (e) => {
                e.preventDefault();
                app.bus.dispatch(event);
            }
        },
        body];
}
