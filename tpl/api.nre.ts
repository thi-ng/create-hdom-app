import { IAtom, IView, ViewTransform } from "@thi.ng/atom/api";

/**
 * Function signature for main app components.
 */
export type AppComponent = (ctx: AppContext, ...args: any[]) => any;

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
    views: Partial<Record<keyof AppViews, ViewSpec>>;
}

/**
 * Base structure of derived views exposed by the base app.
 * Add more declarations here as needed.
 */
export interface AppViews extends Record<keyof AppViews, IView<any>> {
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

/**
 * Structure of the context object passed to all component functions
 */
export interface AppContext {
    state: IAtom<any>;
    views: AppViews;
    ui: UIAttribs;
}
