import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom";
import { EventBus } from "@thi.ng/interceptors/event-bus";

import { AppConfig, ViewSpec, AppViews } from "./api";

/**
 * Generic base app skeleton. You can use this as basis for your own apps.
 *
 * As is the app does not much more than:
 *
 * - initialize state and event bus
 * - attach derived views
 * - define root component wrapper
 * - start hdom render & event bus loop
 */
export class App {

    config: AppConfig;
    state: Atom<any>;
    views: AppViews;
    bus: EventBus;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = new Atom(config.initialState || {});
        this.views = <AppViews>{};
        this.addViews(this.config.views);
        this.bus = new EventBus(this.state, config.events, config.effects);
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
     * Calls `init()` and kicks off hdom render loop, including batched
     * event processing and fast fail check if DOM updates are necessary
     * (assumes ALL state is held in the app state atom. So if there
     * weren't any events causing a state change since last frame,
     * re-rendering is skipped without even attempting to diff DOM tree).
     */
    start() {
        this.init();
        let firstFrame = true;
        start(
            this.config.domRoot,
            () => {
                if (this.bus.processQueue() || firstFrame) {
                    firstFrame = false;
                    return this.config.rootComponent(this, this.config.ui);
                }
            }
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
