import { UIAttribs } from "../api";
import { App } from "../app";

import { appState } from "./appstate";
import { header } from "./header";
import { link } from "./link";

export function home(app: App, ui: UIAttribs) {
    return ["div", ui.root,
        [header, ui, "Welcome to @thi.ng/hdom"],
        ["div", ui.body,
            ["ul",
                ["li", [link, () => alert("it works"), ui.link, "test alert"]],
                ["li", [link, () => app.state.swapIn<number>("counter", (x) => x + 1), ui.link, "test counter"]],
            ],
            [appState, app, ui],
        ]
    ];
}
