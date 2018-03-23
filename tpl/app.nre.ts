import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom";

import { AppConfig, ViewSpec, AppViews } from "./api";

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
    state: Atom<any>;
    views: AppViews;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = new Atom(config.initialState || {});
        this.views = <AppViews>{};
        this.addViews(this.config.views);
    }

    /**
     * Initializes given derived view specs and attaches them to app
     * state atom.
     *
     * @param specs
     */
    addViews(specs: IObjectOf<ViewSpec>) {
        for (let id in specs) {
            const spec = specs[id];
            if (isArray(spec)) {
                this.views[id] = this.state.addView(spec[0], spec[1]);
            } else {
                this.views[id] = this.state.addView(spec);
            }
        }
    }

    /**
     * Calls `init()` and kicks off hdom render loop.
     */
    start() {
        this.init();
        start(
            this.config.domRoot,
            () => this.config.rootComponent(this, this.config.ui)
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
