import { AppConfig } from "./api";
import { EVENTS, EFFECTS } from "./handlers";
import { home } from "./components/home";

// main App configuration
export const CONFIG: AppConfig = {

    // event handlers (defined in handlers.ts)
    events: EVENTS,

    // side effects (defined in handlers.ts)
    effects: EFFECTS,

    // DOM root element (or ID)
    domRoot: "app",

    // root component function used by the app
    rootComponent: home,

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
