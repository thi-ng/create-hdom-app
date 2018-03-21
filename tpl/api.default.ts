import { IObjectOf } from "@thi.ng/api/api";
import { ViewTransform, IView } from "@thi.ng/atom/api";
import { EventDef, EffectDef } from "@thi.ng/interceptors/api";
import { HTMLRouterConfig, RouteMatch } from "@thi.ng/router/api";

import { App } from "./app";

// general types defined for the base app

/**
 * Function signature for main app components.
 * I.e. components representing different app states linked to router.
 */
export type AppComponent = (app: App, ui: UIAttribs) => any;

/**
 * Derived view configurations.
 */
export type ViewSpec = string | [string, ViewTransform<any>];

/**
 * Structure of the overall application config object.
 * See `src/config.ts`.
 */
export interface AppConfig {
    components: IObjectOf<AppComponent>;
    domRoot: string | Element;
    effects: IObjectOf<EffectDef>;
    events: IObjectOf<EventDef>;
    initialState: any;
    router: HTMLRouterConfig;
    ui: UIAttribs;
    views: IObjectOf<ViewSpec>;
}

/**
 * Base structure of derived views exposed by the base app.
 * Add more declarations here as needed.
 */
export interface AppViews extends IObjectOf<IView<any>> {
    route: IView<RouteMatch>;
    routeComponent: IView<any>;
}

/**
 * Helper interface to pre-declare keys of shared UI attributes for
 * components and so enable autocomplete & type safety.
 *
 * See `AppConfig` above and its use in `src/config.ts` and various
 * component functions.
 */
export interface UIAttribs {
    body: any;
    code: any;
    header: any;
    link: any;
    logo: any;
    root: any;
    title: any;
}
