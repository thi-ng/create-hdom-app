import { IObjectOf } from "@thi.ng/api/api";
import { EventDef, EffectDef, FX_DISPATCH_NOW } from "@thi.ng/interceptors/api";
import { forwardSideFx, trace, valueUpdater } from "@thi.ng/interceptors/interceptors";

import * as ev from "./events";
import * as fx from "./effects";

// event handlers events are queued and batch processed in app's RAF
// render loop. event handlers are composable from single functions,
// interceptor objects with `pre`/`post` keys or arrays of either.

// the event handlers' only task is to transform an event into a number
// of side effects assignments. event handlers should be pure functions
// and only side effect functions execute any "real" work.

// Docs here:
// https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/event-bus.ts#L17

export const EVENTS: IObjectOf<EventDef> = {

    [ev.ALERT]: forwardSideFx(fx.ALERT),

    [ev.COUNT]: [
        trace,
        valueUpdater("counter", (x: number) => x + 1),
        (state) => ({ [FX_DISPATCH_NOW]: [ev.ALERT, `clicked ${state.counter} times`] })
    ]
};

// custom side effect definitions

export const EFFECTS: IObjectOf<EffectDef> = {
    [fx.ALERT]: (msg) => alert(msg),
};
