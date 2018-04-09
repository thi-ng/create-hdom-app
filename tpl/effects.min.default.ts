// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/api.ts#L14

/**
 * Triggers route change in router
 */
export const ROUTE_TO = "route-to";
