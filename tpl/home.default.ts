import { UIAttribs } from "../api";
import { App } from "../app";
import { EV_ALERT, EV_COUNT } from "../config";

import { appState } from "./appstate";
import { header } from "./header";
import { eventLink } from "./event-link";
import { routeLink } from "./route-link";

export function home(app: App, ui: UIAttribs) {
    return ["div", ui.root,
        [header, ui, "Welcome to @thi.ng/hdom"],
        ["div", ui.body,
            ["ul",
                ["li", [routeLink, app, "test", { id: 1 }, ui.link, "test route"]],
                ["li", [eventLink, app, [EV_ALERT, "it works"], ui.link, "test alert"]],
                ["li", [eventLink, app, [EV_COUNT], ui.link, "test counter"]],
            ],
            [appState, app, ui],
        ]
    ];
}
