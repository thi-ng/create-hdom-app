import { AppContext } from "../api";

import { appState } from "./appstate";
import { header } from "./header";
import { link } from "./link";

export function home(ctx: AppContext) {
    const ui = ctx.ui;
    return ["div", ui.root,
        [header, "Welcome to @thi.ng/hdom"],
        ["div", ui.body,
            ["ul",
                ["li", [link, ui.link, () => alert("it works"), "test alert"]],
                ["li", [link, ui.link, () => ctx.state.swapIn<number>("counter", (x) => x + 1), "test counter"]],
            ],
            appState,
        ]
    ];
}
