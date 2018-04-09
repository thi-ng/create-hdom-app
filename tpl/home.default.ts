import { AppContext } from "../api";
import { EV_ALERT, EV_COUNT } from "../config";

import { appState } from "./appstate";
import { header } from "./header";
import { eventLink } from "./event-link";
import { routeLink } from "./route-link";

export function home(ctx: AppContext) {
    const ui = ctx.ui;
    return ["div", ui.root,
        [header, "Welcome to @thi.ng/hdom"],
        ["div", ui.body,
            ["ul",
                ["li", [routeLink, ui.link, "test", { id: 1 }, "test route"]],
                ["li", [eventLink, ui.link, [EV_ALERT, "it works"], "test alert"]],
                ["li", [eventLink, ui.link, [EV_COUNT], "test counter"]],
            ],
            appState,
        ]
    ];
}
