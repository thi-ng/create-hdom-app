import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router/api";
import { HTMLRouter } from "@thi.ng/router/history";

import { AppConfig, ViewSpec, AppViews } from "./api";

/**
 * Generic base app skeleton. You can use this as basis for your own
 * apps, see `index.ts` for concrete extension.
 *
 * As is the app does not much more than:
 *
 * - initializing state, event bus, router (if not disabled)
 * - attach derived views
 * - add ROUTE_TO event & effect handlers
 * - define root component wrapper to look up real component based on
 *   current route
 * - start hdom render & event bus loop
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
     * Starts router and kicks off hdom render loop, including batched
     * event processing and fast fail check if DOM updates are necessary
     * (assumes ALL state is held in the app state atom. So if there
     * weren't any events causing a state change since last frame,
     * re-rendering is skipped without even attempting to diff DOM tree).
     */
    start() {
        this.router.start();
        start(this.config.domRoot, () => this.rootComponent());
    }

    /**
     * User provided root component function defined
     * by current route and the derived view defined above.
     */
    rootComponent(): any {
        return this.views.routeComponent;
    }
}
