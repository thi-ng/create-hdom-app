import { Route } from "@thi.ng/router/api";

import { AppConfig } from "./api";

// user defined components for different routes

import { home } from "./components/home";
import { testRoute } from "./components/testroute";

// route definitions
// docs: https://github.com/thi-ng/umbrella/blob/master/packages/router/README.md

export const ROUTE_HOME: Route = {
    id: "home",
    match: ["home"],
};

// example of a parametric route w/ parameter coercion & validation.
// if coercion or validation fails, the route will not be matched if
// no other route matches, the configured default fallback route will
// be used. see full router config further below

export const ROUTE_TEST: Route = {
    id: "test",
    match: ["test", "?id"],
    validate: {
        id: {
            coerce: (x) => parseInt(x),
            check: (x) => x > 0 && x < 3
        }
    }
};

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
        defaultRouteID: ROUTE_HOME.id,
        // IMPORTANT: rules with common prefixes MUST be specified in
        // descending order of highest precision / longest path
        routes: [
            ROUTE_HOME,
            ROUTE_TEST,
        ]
    },

    // mapping route IDs to their respective UI component functions
    // those functions are called automatically by the app's root component
    // based on the currently active route
    components: {
        [ROUTE_HOME.id]: home,
        [ROUTE_TEST.id]: testRoute,
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
    // docs here:
    // https://github.com/thi-ng/umbrella/tree/master/packages/atom#derived-views
    views: {

    },

    // component CSS class config using tachyons-css
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
