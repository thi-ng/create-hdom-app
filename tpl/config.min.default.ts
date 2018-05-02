import { AppConfig } from "./api";
import { EVENTS, EFFECTS } from "./handlers";
import * as routes from "./routes";

// user defined components for different routes

import { main } from "./components/main";

// main App configuration
export const CONFIG: AppConfig = {

    // router configuration
    // docs:
    // https://github.com/thi-ng/umbrella/blob/master/packages/router/src/api.ts#L100
    router: {
        // use URI hash for routes (KISS)
        // (if set to false, a web server is needed)
        useFragment: true,
        // route ID if no other matches (MUST be non-parametric!)
        defaultRouteID: routes.MAIN.id,
        // IMPORTANT: rules with common prefixes MUST be specified in
        // descending order of highest precision / longest path
        routes: [
            routes.MAIN,
        ]
    },

    // event handlers (defined in handlers.ts)
    events: EVENTS,

    // side effects (defined in handlers.ts)
    effects: EFFECTS,

    // mapping route IDs to their respective UI component functions
    // those functions are called automatically by the app's root component
    // based on the currently active route
    components: {
        [routes.MAIN.id]: main,
    },

    // DOM root element (or ID)
    domRoot: "app",

    // initial app state
    initialState: {

    },

    // derived view declarations
    // each key specifies the name of the view and each value is
    // a state path or `[path, transformer]` tuple

    // note: the `route` and `routeComponent` views are created by
    // the App (in app.ts) automatically

    // docs here:
    // https://github.com/thi-ng/umbrella/tree/master/packages/atom#derived-views
    views: {

    },

    // component CSS class config using http://tachyons.io/
    // these attribs are being passed to all/most components
    ui: {
        body: { class: "ma3" },
        root: { class: "ma0 w-100 pa0 sans-serif" },
        link: { class: "pointer link blue" },
    }
};
