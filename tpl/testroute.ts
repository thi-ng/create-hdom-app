import { AppContext } from "../api";

import { appState } from "./appstate";
import { header } from "./header";
import { routeLink } from "./route-link";

export function testRoute(ctx: AppContext) {
    return () => {
        const id = ctx.views.route.deref().params.id;
        return ["div", ctx.ui.root,
            [header, `This is route: test-${id}`],
            ["div", ctx.ui.body,
                [routeLink, ctx.ui.link, "test", { id: id + 1 }, `go to test-${id + 1}`],
                appState,
            ],
        ];
    };
}
