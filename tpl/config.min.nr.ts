import { AppConfig } from "./api";
import { main } from "./components/main";

// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/master/packages/atom/src/api.ts#L19

export const EV_FOO = "foo";

// side effect IDs. these don't / shouldn't need to be exported. other
// parts of the app should / can only use events...
// also see pre-defined side effects in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/master/packages/atom/src/api.ts#L22

// const FX_FOO = "foo";

// main App configuration
export const CONFIG: AppConfig = {

    // event handlers events are queued and batch processed in app's RAF
    // renderloop event handlers can be single functions, interceptor
    // objects with `pre`/`post` keys or arrays of either.

    // the event handlers' only task is to transform the event into a
    // number of side effects. event handlers should be pure functions
    // and only side effect functions execute any "real" work.

    // Docs here:
    // https://github.com/thi-ng/umbrella/blob/master/packages/atom/src/event-bus.ts#L14
    events: {

    },

    // custom side effects
    effects: {

    },

    // DOM root element (or ID)
    domRoot: "app",

    // root component function used by the app
    rootComponent: main,

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
