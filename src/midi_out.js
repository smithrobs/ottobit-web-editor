import MODEL from "./model";
import {log, TRACE} from "./debug";
import {settings} from "./settings";
import {showMidiOutActivity} from "./ui_midi_activity";
import {logOutgoingMidiMessage} from "./ui_midi_window";
import {setPresetNumber} from "./ui_presets";
import {appendMessage, monitorMessage, MSG_SEND_SYSEX} from "./ui_messages";
import {toHexString} from "./utils";
import {setSuppressSysexEcho} from "./midi_in";
import {CMD_GLOBAL_REQUEST, GROUP_ID, MODEL_ID, SYSEX_CMD} from "./model/constants";

let midi_output = null;

export function getMidiOutputPort() {
    return midi_output;
}

export function setMidiOutputPort(port) {
    midi_output = port;
    if (port) {
        log(`setMidiOutputPort: midi_output assigned to "${port.name}"`);
    } else {
        log("setMidiOutputPort: midi_output set to null");
    }
}


// const previous_values = new Array(127);
const monitors = new Array(127);

/*
function updatePreviousValues() {
    const c = MODEL.control;
    for (let i=0; i < c.length; i++) {
        if (typeof c[i] === "undefined") continue;
        previous_values[i] = c.raw_value;
    }
}
*/

function monitorCC(control_number) {
    clearTimeout(monitors[control_number]);
    monitors[control_number] = setTimeout(() => {
        const v = MODEL.control[control_number].raw_value;
        log(`monitor send CC ${control_number} = ${v}`);
        monitorMessage(control_number, v);
    }, 200)
}


let last_send_time = performance.now();     // for echo suppression

export function getLastSendTime() {
    return last_send_time;
}

/**
 * Send a control value to the connected device.
 * @param control
 */
export function sendCC(control, monitor = true) {

    if (monitor) monitorCC(control.cc_number);   // TODO: check that control exists

    const v = MODEL.getControlValue(control);

    if (midi_output) {
        log(`send CC ${control.cc_number} ${v} (${control.name}) on MIDI channel ${settings.midi_channel}`);

        showMidiOutActivity();

        last_send_time = performance.now(); // for echo suppression

        midi_output.sendControlChange(control.cc_number, v, settings.midi_channel);

    } else {
        log(`(send CC ${control.cc_number} ${v} (${control.name}) on MIDI channel ${settings.midi_channel})`);
    }

    logOutgoingMidiMessage("CC", control.cc_number, v);

}

/**
 * Update the connected device.
 * Note: jQuery Knob transmits the value as a float
 *
 * Called by the onChange handlers of dials, switches and selects.
 *
 * @param control_type
 * @param control_number
 * @param value_float
 */
export function updateDevice(control_type, control_number, value_float) {

    let value = Math.round(value_float);

    log("updateDevice", control_type, control_number, value_float, value);

    sendCC(MODEL.setControlValue(control_type, control_number, value));
}

/**
 * Send all values to the connected device
 */
export function fullUpdateDevice(onlyChanged = false, silent = false) {
    if (TRACE) console.groupCollapsed(`fullUpdateDevice(${onlyChanged})`);
    const c = MODEL.control;
    for (let i=0; i < c.length; i++) {
        if (typeof c[i] === "undefined") continue;
        if (!onlyChanged || c[i].randomized) {
            sendCC(c[i], false);
            c[i].randomized = false;
        }
    }
    if (!silent && midi_output) {
        appendMessage("Current settings sent to the Enzo.")
    }
    if (TRACE) console.groupEnd();
}

export function sendPC(pc) {

    setPresetNumber(pc);

    appendMessage(`Preset ${pc} selected.`);

    MODEL.meta.preset_id.value = pc;

    if (midi_output) {
        log(`send program change ${pc}`);
        showMidiOutActivity();

        midi_output.sendProgramChange(pc, settings.midi_channel);

        // appendMessage(MSG_SEND_SYSEX);
    }
    logOutgoingMidiMessage("PC", pc);

    setTimeout(() => requestPreset(), 50);  // we wait 50 ms before requesting the preset
}

export function sendSysEx(data) {
    log("sendSysEx", toHexString(data, ' '), data);
    if (midi_output) {
        showMidiOutActivity();
        setSuppressSysexEcho();
        midi_output.sendSysex(MODEL.meta.signature.sysex.value, Array.from(data));
    }
    logOutgoingMidiMessage("SysEx", 0);
}

function sendSysexCommand(command) {
    log(`sendSysexCommand(${toHexString(command)})`);
    if (midi_output) {
        showMidiOutActivity();
        // setSuppressSysexEcho();
        const data = [0x00, GROUP_ID.pedal, MODEL_ID.enzo, command];
        midi_output.sendSysex(MODEL.meta.signature.sysex.value, data);
        logOutgoingMidiMessage("SysEx", toHexString(data, ' '));
    }
}

export function requestPreset() {
    log("requestPreset");
    sendSysexCommand(SYSEX_CMD.preset_request);
}

export function savePreset(preset_number) {
    log("TODO: savePreset(preset_number)");
}

export function requestGlobalConfig() {
    log("requestPreset");
    sendSysexCommand(SYSEX_CMD.globals_request);
}



