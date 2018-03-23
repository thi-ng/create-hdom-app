import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router/api";
import { HTMLRouter } from "@thi.ng/router/history";

import { AppConfig, ViewSpec, AppViews } from "./api";

/**
 * Generic base app skeleton. You can use this as basis for your own
 * apps.
 *
 * As is the app does not much more than:
 *
 * - initialize state and router
 * - attach derived views
 * - add EVENT_ROUTE_CHANGED handler to store route info in app state
 * - define root component to look up real component based on current
 *   route
 * - start router and hdom render loop
 */
export class App {

    config: AppConfig;
    state: Atom<any>;
    views: AppViews;
    router: HTMLRouter;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = new Atom(config.initialState || {});
        this.views = <AppViews>{};
        this.addViews(this.config.views);
        this.router = new HTMLRouter(config.router);
        this.router.addListener(
            EVENT_ROUTE_CHANGED,
            (e) => this.state.resetIn("route", e.value)
        );
        this.addViews({
            route: "route",
            routeComponent: [
                "route.id",
                (id) =>
                    (this.config.components[id] ||
                        (() => ["div", `missing component for route: ${id}`]))(this, this.config.ui)
            ]
        });
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
        this.init()
        start(this.config.domRoot, () => this.rootComponent());
    }

    /**
     * User provided root component function defined
     * by current route and the derived view defined above.
     */
    rootComponent(): any {
        return this.views.routeComponent;
    }

    /**
     * User initialization hook.
     * Automatically called from `start()`
     */
    init() {
        this.router.start();
        // ...add more init tasks here
    }
}
