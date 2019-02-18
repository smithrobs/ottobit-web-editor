import store from "storejs";

const LOCAL_STORAGE_KEY = "enzo.settings";

export let settings = {
    midi_channel: "all",
    input_device_id: null,    // web midi port ID
    output_device_id: null    // web midi port ID
};

export function loadSettings() {
    const s = store.get(LOCAL_STORAGE_KEY);
    if (s) settings = JSON.parse(s);
}

export function saveSettings(options = {}) {
    Object.assign(settings, settings, options);
    store(LOCAL_STORAGE_KEY, JSON.stringify(settings));
}