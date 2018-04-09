import { AppContext } from "../api";
import { App } from "../app";

/**
 * Customizable hyperlink component emitting EV_ROUTE_TO event when clicked.
 *
 * @param ctx
 * @param routeID route ID
 * @param routeParams route parameter object
 * @param attribs element attribs
 * @param body link body
 */
export function routeLink(ctx: AppContext, attribs: any, routeID: PropertyKey, routeParams: any, body: any) {
    return ["a",
        {
            ...attribs,
            onclick: (e) => {
                e.preventDefault();
                ctx.bus.dispatch([App.EV_ROUTE_TO, [routeID, routeParams]]);
            }
        },
        body];
}
