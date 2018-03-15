import { AppConfig } from "./api";

// main App configuration
export const CONFIG: AppConfig = {

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
        root: { class: "ma0 w-100 pa0 sans-serif" },
        header: { class: "h5 pa4 tc bg-dark-gray white" },
        body: { class: "ma3" },
        title: { class: "f1 fw4" },
        logo: { class: "br-100 w3 h3", src: "assets/logo.png" },
        link: { class: "pointer link blue" },
        code: { class: "pa3 code bg-washed-yellow" }
    }
};
