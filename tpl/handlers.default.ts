import { IObjectOf } from "@thi.ng/api/api";
import { EventDef, EffectDef, FX_DISPATCH_NOW } from "@thi.ng/interceptors/api";
import { forwardSideFx, trace, valueUpdater } from "@thi.ng/interceptors/interceptors";

import * as ev from "./events";
import * as fx from "./effects";

export const EVENTS: IObjectOf<EventDef> = {

    [ev.ALERT]: forwardSideFx(fx.ALERT),

    [ev.COUNT]: [
        trace,
        valueUpdater("counter", (x: number) => x + 1),
        (state) => ({ [FX_DISPATCH_NOW]: [ev.ALERT, `clicked ${state.counter} times`] })
    ]
};

export const EFFECTS: IObjectOf<EffectDef> = {
    [fx.ALERT]: (msg) => alert(msg),
};
