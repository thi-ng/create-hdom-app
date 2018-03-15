import { IObjectOf } from "@thi.ng/api/api";
import { ViewTransform, IView } from "@thi.ng/atom/api";

import { App } from "./app";

// general types defined for the base app

/**
 * Function signature for main app components.
 */
export type AppComponent = (app: App, ui: UIAttribs) => any;

/**
 * Derived view configurations.
 */
export type ViewSpec = string | [string, ViewTransform<any>];

/**
 * Structure of the overall application config object
 */
export interface AppConfig {
    domRoot: string | Element;
    initialState: any;
    rootComponent: AppComponent;
    ui: UIAttribs;
    views: IObjectOf<ViewSpec>;
}

/**
 * Base structure of derived views exposed by the base app.
 * Add more declarations here as needed.
 */
export interface AppViews extends IObjectOf<IView<any>> {
}

/**
 * Helper interface to pre-declare all possible keys for UI attributes
 * and so enable autocomplete & type safety.
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
