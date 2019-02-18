import {TRACE} from "./debug";
import DEVICE from "./enzo/enzo";
import Knob from "svg-knob";
import {KNOB_CONF} from "./conf";

export const knobs = {};         // svg-knob

/**
 *
 */
export function setupKnobs(userActionCallback) {

    if (TRACE) console.log("setupKnobs()");

    for (let i=0; i < DEVICE.control.length; i++) {

        const c = DEVICE.control[i];
        if (typeof c === "undefined") {
            if (TRACE) console.log("device undefined", i);
            continue;
        }

        const id = `${c.cc_type}-${c.cc_number}`;
        const v = DEVICE.getControlValue(DEVICE.control[i]);

        let elem = document.getElementById(id);
        if (elem === null) {
            // console.warn(`setupKnobs: element not found for id ${id}`);
            continue;
        }
        if (!elem.classList.contains("knob")) return;

        if (TRACE) console.log(`configure #${id}: range=${c.cc_range}, init-value=${v}`);

        knobs[id] = new Knob(elem, KNOB_CONF);
        knobs[id].config = {
            value_min: Math.min(...c.cc_range),
            value_max: Math.max(...c.cc_range),
            default_value: v,
            center_zero: Math.min(...c.range) < 0,
            center_value: c.hasOwnProperty("cc_center") ? c.cc_center : c.init_value,
            format: v => c.human(v)
        };
        knobs[id].disableDebug();

        elem.addEventListener("change", function(event) {
            userActionCallback(c.cc_type, c.cc_number, event.detail);
        });
    }

} // setupKnobs