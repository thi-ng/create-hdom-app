import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom";

import { AppConfig, AppContext, AppViews, ViewSpec } from "./api";

/**
 * Generic base app skeleton. You can use this as basis for your own
 * apps.
 *
 * As is the app does not much more than:
 *
 * - initialize state
 * - attach derived views
 * - define root component wrapper
 * - start hdom render loop
 */
export class App {

    config: AppConfig;
    ctx: AppContext;

    constructor(config: AppConfig) {
        this.config = config;
        this.ctx = {
            state: new Atom(config.initialState || {}),
            views: <AppViews>{},
            ui: config.ui,
        };
        this.addViews(this.config.views);
    }

    /**
     * Initializes given derived view specs and attaches them to app
     * state atom.
     *
     * @param specs
     */
    addViews(specs: IObjectOf<ViewSpec>) {
        const { state, views } = this.ctx;
        for (let id in specs) {
            const spec = specs[id];
            if (isArray(spec)) {
                views[id] = state.addView(spec[0], spec[1]);
            } else {
                views[id] = state.addView(spec);
            }
        }
    }

    /**
     * Calls `init()` and kicks off hdom render loop.
     */
    start() {
        this.init();
        start(
            () => this.config.rootComponent(this.ctx),
            { root: this.config.domRoot, ctx: this.ctx }
        );
    }

    /**
     * User initialization hook.
     * Automatically called from `start()`
     */
    init() {
        // ...add init tasks here
    }
}
