
import {TRACE} from "./debug";
import {settings} from "./settings";
import * as WebMidi from "webmidi";

export function updateSelectDeviceList() {

    if (TRACE) console.log("updateSelectDeviceList", settings.input_device_id, settings.output_device_id);

    let present = false;
    let s = $("#midi-input-device");
    s.empty().append($("<option>").val("").text("- select -"));
    s.append(
        WebMidi.inputs.map((port, index) => {
            present = present || (port.id === settings.input_device_id);
            if (TRACE) console.log("input select:", port.id, settings.input_device_id, typeof port.id, typeof settings.input_device_id, present);
            return $("<option>").val(port.id).text(`${port.name}`);
        })
    );
    s.val(present ? settings.input_device_id : "");

    present = false;
    s = $("#midi-output-device");
    s.empty().append($("<option>").val("").text("- select -"));
    s.append(
        WebMidi.outputs.map((port, index) => {
            present = present || (port.id === settings.output_device_id);
            if (TRACE) console.log("output select:", port.id, settings.output_device_id, typeof port.id, typeof settings.output_device_id, present);
            return $("<option>").val(port.id).text(`${port.name}`);
        })
    );
    s.val(present ? settings.output_device_id : "");
}