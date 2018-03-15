import { UIAttribs } from "../api";
import { App } from "../app";

import { header } from "./header";
import { appState } from "./appstate";
import { routeLink } from "./route-link";

export function testRoute(app: App, ui: UIAttribs) {
    return () => {
        const id = app.views.route.deref().params.id;
        return ["div", ui.root,
            [header, ui, `This is route: test-${id}`],
            ["div", ui.body,
                [routeLink, app, "test", { id: id + 1 }, ui.link, `go to test-${id + 1}`],
                [appState, app, ui],
            ],
        ];
    };
}
