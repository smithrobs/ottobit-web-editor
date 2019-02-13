import {control_id, control} from "./cc.js";
import meta from "./meta.js";
import sysex from "./sysex.js";

/**
 *
 * @returns {number}
 * @param ctrl
 */
const getControl = function (number) {
    return control[number];
};

/**
 *
 * @returns {number}
 * @param ctrl
 */
const getControlValue = function (ctrl) {
    return "raw_value" in ctrl ? ctrl.raw_value : 0;
};

/**
 * setControlValue(control_object, value)
 * setControlValue(control_type, control_number, value)
 * return the updated control object
 */
const setControlValue = function () {
    // console.log("BS2.setControlValue", ...arguments);
    let c;
    if (arguments.length === 2) {
        let value = arguments[1];
        const v = typeof value === "number" ? value : parseInt(value);
        c = arguments[0];
        if (c.hasOwnProperty("map_raw")) {
            c.raw_value = c.map_raw(v);
        } else {
            c.raw_value = v;
        }
    } else if (arguments.length === 3) {
        let ca; // controls array
        if (arguments[0] === "cc") {                // [0] is control type
            ca = control;
        // } else if (arguments[0] === "nrpn") {
        //     ca = nrpn;
        } else {
            console.error("setControlValue: invalid control_type", arguments);
            return null;
        }
        if (ca[arguments[1]]) {                     // [1] is control number
            let value = arguments[2];               // [2] is control value
            const v = typeof value === "number" ? value : parseInt(value);
            c = ca[arguments[1]];
            if (c.hasOwnProperty("map_raw")) {
                c.raw_value = c.map_raw(v);
            } else {
                c.raw_value = v;
            }
        } else {
            console.error("setControlValue: unknown number", arguments);
            return null;
        }
    } else {
        console.error("setControlValue: invalid arguments", arguments);
        return null;
    }
    return c;
};

/**
 *
 */
const init = function () {
    for (let i = 0; i < control.length; i++) {
        let c = control[i];
        if (typeof c === "undefined") continue;
        c.raw_value = c.init_value;
        c.value = c.human(c.raw_value);
    }
};

/**
 * @param groups Array of group names. Specify which control groups to randomize. Example: ["sub", "lfo1", "lfo2", "osc1", "osc2"]
 */
const randomize = function() {

    for (let i = 0; i < control.length; i++) {

        const c = control[i];
        if (typeof c === "undefined") continue;

        let v;
        if (c.hasOwnProperty("randomize")) {
            v = c.randomize;
        } else {
            if (c.on_off) {
                v = Math.round(Math.random());
            } else {
                let min = Math.min(...c.cc_range);
                v = Math.round(Math.random() * (Math.max(...c.cc_range) - min)) + min;  //TODO: step
            }
            if (c.hasOwnProperty("map_raw")) {
                v = c.map_raw(v);
            }
        }
        c.raw_value = v;
        c.randomized = true;
    }

};

/**
 * Only for CC, not for NRPN
 *
 * Returns an array of "midi messages" to send to update control to value
 * @param ctrl
 */
const getMidiMessagesForCC = function (ctrl) {
    if (ctrl.cc_type !== "cc") return [];
    let CC = [];
    let value = getControlValue(ctrl);
    CC.push([ctrl.cc_number, value]);
    return CC;
};

export default {
    name: "Enzo",
    // name_device_in: "mi.1 Bluetooth",
    // name_device_out: "mi.1 Bluetooth",
    meta,
    control_id,
    control,
    init,
    randomize,
    getControl,
    getControlValue,
    setControlValue,
    setValuesFromSysEx: sysex.setDump,     // set values from a SysEx dump
    getSysEx: sysex.getDump,     // export all values as a SysEx dump
    validate: sysex.validate,   // validate a SysEx dump
    getMidiMessagesForCC
};
