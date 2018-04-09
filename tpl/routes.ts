import { Route } from "@thi.ng/router/api";

// route definitions
// docs: https://github.com/thi-ng/umbrella/blob/master/packages/router/README.md

export const HOME: Route = {
    id: "home",
    match: ["home"],
};

// example of a parametric route w/ parameter coercion & validation.
// if coercion or validation fails, the route will not be matched if
// no other route matches, the configured default fallback route will
// be used. see full router config further below

export const TEST: Route = {
    id: "test",
    match: ["test", "?id"],
    validate: {
        id: {
            coerce: (x) => parseInt(x),
            check: (x) => x > 0 && x < 3
        }
    }
};
