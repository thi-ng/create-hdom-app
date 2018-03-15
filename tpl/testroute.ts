import { App } from "../app";
import { header } from "./header";
import { appState } from "./appstate";

export function testRoute(app: App, ui: any) {
    return () => {
        const id = app.views.route.deref().params.id;
        return ["div", ui.root,
            [header, ui, `This is route: test-${id}`],
            ["div", ui.body,
                ["a", { href: `#/test/${id + 1}` }, `go to test-${id + 1}`],
                [appState, app, ui],
            ],
        ];
    };
}
