import {log} from "./debug";
import MODEL from "./model";
import {displayPreset, setPresetNumber} from "./ui_presets";
import {updateUI} from "./ui";
import {fullUpdateDevice} from "./midi_out";
import {clearError, setStatus} from "./ui_messages";
import {updateBookmark} from "./hash";
import {settings, SETTINGS_UPDATE_URL} from "./settings";

export function init() {
    log("init()");
    MODEL.init();
    setPresetNumber(0);
    displayPreset();
    updateUI(true);
    fullUpdateDevice();
    clearError();
    if ((settings.update_URL & SETTINGS_UPDATE_URL.on_init) ||
        (settings.update_URL & SETTINGS_UPDATE_URL.on_randomize_and_init)) updateBookmark();
    setStatus("Enzo set to 'init' configuration.");
    return false;   // disable the normal href behavior
}

export function randomize() {
    log("randomize");
    MODEL.randomize();
    setPresetNumber(0);
    displayPreset();
    updateUI();
    fullUpdateDevice(true);    // true == update only updated values (values which have been marked as changed)
    clearError();
    if ((settings.update_URL & SETTINGS_UPDATE_URL.on_randomize) ||
        (settings.update_URL & SETTINGS_UPDATE_URL.on_randomize_and_init)) updateBookmark();
    setStatus("Enzo randomized.");
    return false;   // disable the normal href behavior
}
