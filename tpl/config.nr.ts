import { FX_DISPATCH_NOW } from "@thi.ng/atom/api";
import { trace, valueUpdater } from "@thi.ng/atom/interceptors";
import { AppConfig } from "./api";

// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/master/packages/atom/src/api.ts#L19

export const EV_ALERT = "alert";
export const EV_COUNT = "count";
export const EV_ERROR = "error";
export const EV_SUCCESS = "success";

// side effect IDs. these don't / shouldn't need to be exported. other
// parts of the app should / can only use events...
// also see pre-defined side effects in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/master/packages/atom/src/api.ts#L22

const FX_ALERT = "alert";

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
        [EV_ALERT]: (_, [__, msg]) => ({ [FX_ALERT]: msg }),

        [EV_COUNT]: [
            trace,
            valueUpdater("counter", (x: number) => x + 1),
            (state) => ({ [FX_DISPATCH_NOW]: [EV_ALERT, `clicked ${state.counter} times`] })
        ]
    },

    // custom side effects
    effects: {
        [FX_ALERT]: (msg) => alert(msg),
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
        counter: "counter",
    },

    // component CSS class config using tachyons-css
    // these attribs are being passed to all/most components
    ui: {
        root: { class: "ma0 w-100 pa0 sans-serif" },
        header: { class: "h5 pa4 tc bg-dark-gray white" },
        body: { class: "ma3" },
        title: { class: "f1 fw4" },
        logo: { class: "br-100 w3 h3", src: "assets/logo.png" },
        link: { class: "pointer link blue" },
        code: { class: "pa3 code bg-washed-yellow" }
    }
};
