import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom";
import { EventBus } from "@thi.ng/interceptors/event-bus";
import { valueSetter } from "@thi.ng/interceptors/interceptors";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router/api";
import { HTMLRouter } from "@thi.ng/router/history";

import { AppConfig, AppContext, AppViews, ViewSpec } from "./api";

/**
 * Generic base app skeleton. You can use this as basis for your own
 * apps.
 *
 * As is the app does not much more than:
 *
 * - initialize state, event bus, router (if not disabled)
 * - attach derived views
 * - add ROUTE_TO event & effect handlers
 * - define root component wrapper to look up real component based on
 *   current route
 * - start router, hdom render & event bus loop
 */
export class App {

    static readonly EV_ROUTE_TO = "route-to";
    static readonly FX_ROUTE_TO = "route-to";

    config: AppConfig;
    ctx: AppContext;
    state: Atom<any>;
    router: HTMLRouter;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = new Atom(config.initialState || {});
        this.ctx = {
            bus: new EventBus(this.state, config.events, config.effects),
            views: <AppViews>{},
            ui: config.ui,
        };
        this.addViews(this.config.views);
        this.router = new HTMLRouter(config.router);
        this.router.addListener(
            EVENT_ROUTE_CHANGED,
            (e) => this.ctx.bus.dispatch([EVENT_ROUTE_CHANGED, e.value])
        );
        this.ctx.bus.addHandlers({
            [EVENT_ROUTE_CHANGED]: valueSetter("route"),
            [App.EV_ROUTE_TO]: (_, [__, route]) => ({ [App.FX_ROUTE_TO]: route })
        });
        this.ctx.bus.addEffect(
            App.FX_ROUTE_TO,
            ([id, params]) => this.router.routeTo(this.router.format(id, params))
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
        const views = this.ctx.views;
        for (let id in specs) {
            const spec = specs[id];
            if (isArray(spec)) {
                views[id] = this.state.addView(spec[0], spec[1]);
            } else {
                views[id] = this.state.addView(spec);
            }
        }
    }

    /**
     * Calls `init()` and kicks off hdom render loop, including batched
     * event processing and fast fail check if DOM updates are necessary
     * (assumes ALL state is held in the app state atom). So if there
     * weren't any events causing a state change since last frame,
     * re-rendering is skipped without even attempting to diff DOM
     * tree).
     */
    start() {
        this.init();
        start(
            this.config.domRoot,
            () => {
                if (this.ctx.bus.processQueue()) {
                    return this.ctx.views.routeComponent;
                }
            },
            this.ctx
        );
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
