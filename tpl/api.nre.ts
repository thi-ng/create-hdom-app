import { IObjectOf } from "@thi.ng/api/api";
import { ViewTransform, IView } from "@thi.ng/atom/api";

import { App } from "./app";

// general types defined for the base app

/**
 * Function signature for main app components.
 */
export type AppComponent = (app: App, ui: any) => any;

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
    views: IObjectOf<ViewSpec>;
    ui: any;
}

/**
 * Base structure of derived views exposed by the base app
 */
export interface AppViews extends IObjectOf<IView<any>> {
}
