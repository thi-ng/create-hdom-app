import { FX_DISPATCH_NOW } from "@thi.ng/interceptors/api";
import { forwardSideFx, trace, valueUpdater } from "@thi.ng/interceptors/interceptors";

import { AppConfig } from "./api";

import * as ev from "./events";
import * as fx from "./effects";
import * as routes from "./routes";

// user defined components for different routes

import { home } from "./components/home";
import { testRoute } from "./components/testroute";

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
        defaultRouteID: routes.HOME.id,
        // IMPORTANT: rules with common prefixes MUST be specified in
        // descending order of highest precision / longest path
        routes: [
            routes.HOME,
            routes.TEST,
        ]
    },

    // event handlers events are queued and batch processed in app's RAF
    // render loop event handlers can be single functions, interceptor
    // objects with `pre`/`post` keys or arrays of either.

    // the event handlers' only task is to transform the event into a
    // number of side effects. event handlers should be pure functions
    // and only side effect functions execute any "real" work.

    // Docs here:
    // https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/event-bus.ts#L14
    events: {
        [ev.ALERT]: forwardSideFx(fx.ALERT),

        [ev.COUNT]: [
            trace,
            valueUpdater("counter", (x: number) => x + 1),
            (state) => ({ [FX_DISPATCH_NOW]: [ev.ALERT, `clicked ${state.counter} times`] })
        ]
    },

    // custom side effects
    effects: {
        [fx.ALERT]: (msg) => alert(msg),
    },

    // mapping route IDs to their respective UI component functions
    // those functions are called automatically by the app's root component
    // based on the currently active route
    components: {
        [routes.HOME.id]: home,
        [routes.TEST.id]: testRoute,
    },

    // DOM root element (or ID)
    domRoot: "app",

    // initial app state
    initialState: {
        counter: 0,
    },

    // derived view declarations
    // each key specifies the name of the view and each value is
    // a state path or `[path, transformer]` tuple

    // note: the `route` and `routeComponent` views are created by
    // the App (in app.ts) automatically

    // docs here:
    // https://github.com/thi-ng/umbrella/tree/master/packages/atom#derived-views
    views: {
        counter: "counter",
    },

    // component CSS class config using http://tachyons.io/
    // these attribs are being passed to all/most components
    ui: {
        body: { class: "ma3" },
        code: { class: "pa3 code bg-washed-yellow" },
        header: { class: "h5 pa4 tc bg-dark-gray white" },
        link: { class: "pointer link blue" },
        logo: { class: "br-100 w3 h3", src: "assets/logo.png" },
        root: { class: "ma0 w-100 pa0 sans-serif" },
        title: { class: "f1 fw4" },
    }
};
