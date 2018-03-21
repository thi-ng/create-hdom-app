import { Route } from "@thi.ng/router/api";

import { AppConfig } from "./api";

// user defined components for different routes

import { main } from "./components/main";

// route definitions
// docs: https://github.com/thi-ng/umbrella/blob/master/packages/router/README.md

export const ROUTE_MAIN: Route = {
    id: "main",
    match: ["main"],
};

// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/api.ts#L14

export const EV_FOO = "foo";

// side effect IDs. these don't / shouldn't need to be exported. other
// parts of the app should / can only use events...
// also see pre-defined side effects in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/api.ts#L19

// const FX_FOO = "foo";

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
        defaultRouteID: ROUTE_MAIN.id,
        // IMPORTANT: rules with common prefixes MUST be specified in
        // descending order of highest precision / longest path
        routes: [
            ROUTE_MAIN,
        ]
    },

    // event handlers events are queued and batch processed in app's RAF
    // renderloop event handlers can be single functions, interceptor
    // objects with `pre`/`post` keys or arrays of either.

    // the event handlers' only task is to transform the event into a
    // number of side effects. event handlers should be pure functions
    // and only side effect functions execute any "real" work.

    // Docs here:
    // https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/event-bus.ts#L14
    events: {

    },

    // custom side effects
    effects: {

    },

    // mapping route IDs to their respective UI component functions
    // those functions are called automatically by the app's root component
    // based on the currently active route
    components: {
        [ROUTE_MAIN.id]: main,
    },

    // DOM root element (or ID)
    domRoot: "app",

    // initial app state
    initialState: {

    },

    // derived view declarations
    // each key specifies the name of the view and each value is
    // a state path or `[path, transformer]` tuple
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
