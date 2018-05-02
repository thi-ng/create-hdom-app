import { AppConfig } from "./api";
import { EVENTS, EFFECTS } from "./handlers";
import { main } from "./components/main";

// main App configuration
export const CONFIG: AppConfig = {

    // event handlers (defined in handlers.ts)
    events: EVENTS,

    // side effects (defined in handlers.ts)
    effects: EFFECTS,

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
