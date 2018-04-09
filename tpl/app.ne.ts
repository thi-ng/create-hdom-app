import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router/api";
import { HTMLRouter } from "@thi.ng/router/history";

import { AppConfig, AppContext, AppViews, ViewSpec } from "./api";

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
    ctx: AppContext;

    constructor(config: AppConfig) {
        this.config = config;
        this.ctx = {
            state: new Atom(config.initialState || {}),
            router: new HTMLRouter(config.router),
            views: <AppViews>{},
            ui: config.ui,
        };
        this.addViews(this.config.views);
        this.ctx.router.addListener(
            EVENT_ROUTE_CHANGED,
            (e) => this.ctx.state.resetIn("route", e.value)
        );
        this.addViews({
            route: "route",
            routeComponent: [
                "route.id",
                (id) =>
                    (this.config.components[id] ||
                        (() => ["div", `missing component for route: ${id}`]))(this.ctx)
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
        this.init()
        start(
            this.config.domRoot,
            () => this.ctx.views.routeComponent,
            this.ctx
        );
    }

    /**
     * User initialization hook.
     * Automatically called from `start()`
     */
    init() {
        this.ctx.router.start();
        // ...add more init tasks here
    }
}
