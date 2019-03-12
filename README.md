Enzo web editor
===============

Control your Meris Enzo pedal with your web browser. View all the pedal's settings at once.

![Enzo Editor screenshot](/images/screenshots/enzo-editor-0.80.2-480px.jpg "Enzo Editor screenshot")

[Open the editor](https://sysex.io/enzo/editor/)


Requirements
============

- A browser that [supports](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess#Browser_compatibility) the [Web MIDI API](http://webaudio.github.io/web-midi-api/). Currently, 
only **Chrome** and **Opera** support this standard. 
- A [Meris MIDI I/O](https://www.meris.us/product/midi-i-o/) interface.
- A MIDI interface in your computer. This can be a homestudio audio interface or, if your computer support Bluetooth, 
a MIDI Bluetooth adapter plugged into the Meris MIDI I/O interface. 


Setup
=====

1. Set the Enzo's EXP/MIDI connector for MIDI communication.
2. Set the Enzo's MIDI mode to MIDI OUT. 
3. Set the Enzo's MIDI PORT.
4. Connect the Enzo with the MIDI I/O interface. Use a stereo (TRS) jack cable.
5. Connect the MIDI I/O interface to your computer.
6. Open https://sysex.io/enzo/editor 
7. Allow the browser to access your MIDI devices.
8. In the top-right of the editor, select the MIDI input and output devices corresponding to the MIDI I/O and the MIDI port corresponding to your Enzo MIDI port setting.
9. Move a knob on your Enzo, the corresponding control in the editor must react accordingly.
10. Play some sound through the Enzo and move a knob in the editor. The sound should change as if you have moved the same control on the Enzo. 
11. Enjoy your Enzo!

MIDI on the Enzo
----------------

If you can't get the MIDI communication working, check the following on the Enzo:

- The Global Settings EXP MODE is set to MIDI
- The Global Settings MIDI is set to MIDI OUT
- Choose a Global Settings MIDI CHANNEL.  
- The cable between the Enzo and the MIDI I/O interface is TRS (stereo).
- The MIDI I/O interface is powered on.
- The Enzo is powered on.
- The TSR cable is connected between one of the 4 MIDI I/O jack and the Enzo's EXP/MIDI connecter.
- The MIDI I/O interface is connected to your PC.
- The MIDI editor uses the same channel as the Enzo's MIDI channel defined in the Global Settings.

Check the [Meris Enzo User Manual](https://www.meris.us/wp-content/uploads/2018/06/Meris_Enzo_Manual_v1c.pdf) and 
the [Meris MIDI I/O User Manual](https://www.meris.us/wp-content/uploads/2018/03/Meris_MIDI_IO_Full_Manual_v1b.pdf) 
for more informations and instructions about how to set the Enzo's Global Settings.

MIDI in the browser
-------------------

You must use a browser that supports the [Web MIDI](https://www.midi.org/17-the-mma/99-web-midi) API specifications. 

Currently, only the following browsers [support](https://caniuse.com/#feat=midi) the Web MIDI API:

- Chrome (Mac, Linux, Windows) 
- Opera (Mac, Linux, Windows)

Web MIDI is not supported under iOS (iPad, iPhone). The editor may work under Android but I did not test it.

Scroll down to [MIDI in the browser](#MIDI-in-the-browser) to get more information about how to check and setup MIDI in your browser.

MIDI in the editor
------------------

Once you have your Enzo connected to the MIDI I/O interface, you must configure the editor:

1. Select the input device 
2. Select the output device
3. Select the MIDI channel
    * You can leave the channel set to "all" but this is not recommended as this will send every messages to all channels 
    every time and this can perturb other MIDI devices which are connected to your computer. 
    
The editor's preferences (settings) are saved in your browser's _Local Storage_.

   
Synchronizing Enzo and the editor
=================================

**IMPORTANT:** please keep in mind that the editor only has the possibility to read the saved preset from Enzo. It can not read the _current_ values ​​of the controls. 
These values may be different from the one saved in memory (saved as a preset).

Also, do not forget that each time you access a "Alt/2nd layer" value, the preset is saved (see Enzo User Manual Section 7, page 9). 

It is therefore recommended to always select a preset from the editor as first action after having opened it. After that, 
unless the MIDI connection is interrupted, the Enzo and the editor should always remain in sync.
    
Synchronizing with Sysex
------------------------

The editor can receive SysEx from the Enzo. You can use this possibility to update the editor with the current preset of the Enzo.
You have two possibilities to synchronize the editor with the Enzo:

1. From the Enzo, send the preset as Sysex Data (see _Enzo User Manual_ page 9). 
To do that, press the Bypass LED switch while holding the ALT button. The editor will tell you when it has received a 
preset as SysEx.

![SysEx received](/images/screenshots/sysex-received.jpg "SysEx received")

Note: while you hold the ALT switch, the Enzo will save the preset before sending it. 
 
Out of sync
-----------

The editor can become out-of-sync with the Enzo in that situation:

1. The editor is not yet connected to Enzo.
2. On the Enzo a preset has been loaded.
3. On the Enzo, some values have been modified.
4. The editor is started.
    a. The editor will read the current preset (from the Enzo _memory_)
    b. Enzo will send the value saved in memory for the current preset. It will not send the _current_ values of the knobs and buttons. 
    
To avoid this problem:

- Option 1: select a preset in the editor. This will select the preset in the Enzo. Unsaved settings will be lost. 
- Option 2: save the current preset (with the WRITE command in the editor or the ALT switch in Enzo) then select this preset from
the editor. No settings will be lost and the editor will be in sync.   

Presets
=======

Preset selection
----------------

The square buttons 1 to 16 on the top left of the editor allow you to directly select one of the sixteen editor settings.

After you select a preset, its selector gets a yellow background:

![clean preset](/images/screenshots/preset-selected-clean.jpg)

Now, if you modify any value, the selector changes to:

![dirty preset](/images/screenshots/preset-selected-dirty.jpg)

This reminds you that the currently selected _preset number_ is the one shown, but that the current settings differ from those
stored in the Enzo's memory for this preset.

If you want to keep your current values and save them in the Enzo memory then you have to use the SAVE command from the menu. See next
chapter.

Saving presets
--------------
    
1. Select a preset,
2. Twist the knobs, have fun, make a great sound,
3. Save the preset

From the [Meris online FAQ](https://www.meris.us/support/): 
> To save a preset, press one of the footswitches on the preset switch, modify your sound, then hold ALT to save."
    
Note: you can not save to preset number different than the current number. 

To save the preset, use the SAVE menu option in the editor or press and hold the ALT button on the Enzo. 

![save command](/images/screenshots/save_command.jpg)

Note: if you save the preset on the Enzo (with ALT button), then you have to select the preset again in the editor
to make sure it remains in sync with the Enzo.    
    
Loading presets
---------------

Presets can be stored in files (binary .syx files) and, with this editor, presets can also be stored as URLs. 

When you load a preset, it is sent to the Enzo and replace the current _live_ values. It does not replace the preset _stored in memory_. If you want to keep the preset you loaded
in the Enzo, then you need to store it, either by using the menu SAVE command of this editor or by pressing and holding the ALT button on the Enzo.  
        
        
Expression pedal
================

Press the Tab key on your keyboard or click "close" near the EXP slider in the editor to toggle between the two sets of values stored in a preset.

When you edit the second set of values, the control's name are written in _lowercase_. They are written in _uppercase_ when you edit the default set of value.

EXP slider
----------

The EXP slider allows you to simulate an expression pedal connected to the Enzo.

* The slider's _open_ position (slider at 0) corresponds to a opened (toe-up) expression pedal.
* The slider's _close_ position (slider at 127) corresponds to a closed (toe-down) expression pedal.

For each of its knobs, the Enzo stores two values: 
- the first one is the default one and is used when the expression pedal is at 0 or when no expression pedal is connected. 
- the second value is the one ued when the expression pedal is at its maximum. 

When you move the expression pedal between its min and max position, the Enzo will morph the values between those two sets of values.

Please read the [Meris Enzo User Manual](https://www.meris.us/wp-content/uploads/2018/06/Meris_Enzo_Manual_v1c.pdf), section 5, for more informations.

This editor lets you define the values for the two positions of the expression pedal.   

By default, the first set of values is always used. To edit the second sets of values you have to click on EXP _close_:

![todo](/images/screenshots/exp_edit_mode.jpg)

The _close_ text will be highlighted and also all the knobs names will change to lowercase. This shows you that you are now editing the second sets of values.

Note: you can also use your keyboard TAB key to toggle between the two sets of values.

To switch back to the default set of value, simply click _close_ again. The _close_ text must change back to black and the knobs names must change back to uppercase.

You can now use the EXP slider to smoothly morph between the two sets of values. The editor will interpolate the values to show you what the Enzo is probably doing. 
But there is no guarantee about that. The editor does a linear interpolation. Maybe Enzo does a different kind of interpolation.

If you want to use this with a real expression pedal connected to the Enzo (and thus without MIDI), do not forget to save your preset with the menu's SAVE command. 


URL update
==========

The editor can update its URL to include a representation of the current settings. This is like appending a hexadecimal SysEx to the URL.

![SysEx as URL hash](/images/screenshots/url_hash.jpg "SysEx as URL hash")

When you access an URL containing such a parameter, then the editor will use it to set the value of the knobs and switches. It will also
send these values to the Enzo.

So you can use URLs as _preset bookmarks_!

Opening the editor with a URL containing a preset
-------------------------------------------------

If you already have the Enzo running with a nice preset and you connect it to the editor, maybe you don't want the editor to overwrite
this preset because you open it with such a URL. To avoid this case, in the editor preferences, you can choose the behavior you
prefer:

![Preference for start mode](/images/screenshots/pref-init.jpg "Preference for start mode")
    
Automatic update of the URL
---------------------------

You can manually update the URL with the URL command in the menu or you can let the editor automatically update it. You can
set this in the editor preferences:

![Preference URL](/images/screenshots/pref-url.jpg "Preference URL")

The REC button also lets you start at will the auto-updating of the URL.

![REC button](/images/screenshots/rec.jpg "REC button")

REC is automatically stopped if you use your browser's history. 

Use REC to record all your changes and later on travel back in time!


Menu commands
=============

| icon | command | direction  | description  |
|---|---|---|---|
|   | Init | editor --> Enzo | Set convenient "default" values. |
|   | Randomize  | editor --> Enzo | Set random values for all controls. |
|   | Send  | editor --> Enzo | Send the current editor's values to Enzo (does _not_ save in Enzo's memory). |
|   | Save  | editor --> Enzo | Tell the Enzo to save in memory the current settings (updates the current preset). |
|   | URL  | editor only | Update the editor's URL with the current values. This makes a "_bookmarkable preset_". |
|   | Print  | editor only | Open a popup window with the currents settings displayed for printing (or saving as PDF). |
|   | Load  | editor --> Enzo | Load a preset from a sysex file and send the values to the Enzo. |
|   | Download  | editor only | Download the current editor's values as a sysex file. |
|   | Midi  | editor <--> Enzo | Open a popup displaying all the MIDI messages exchanged between the editor and the Enzo. |
|   | Global  | editor <--> Enzo | Display and edit the Global Settings of the Enzo. |
|   | Prefs  | editor only | Display and edit the editor's preferences. |
|   | Help  | editor only | Display a summary of the editor usage. |
|   | About  | editor only | Display version and credits about the editor. |


MIDI in the browser
===================

If you can't get the MIDI communication working, check the following on the browser:

- You use a browser that supports the [Web MIDI](https://www.midi.org/17-the-mma/99-web-midi) API specifications. 
Currently, only the following browsers [support](https://caniuse.com/#feat=midi) the Web MIDI API:

    - Chrome (Mac, Linux, Windows) 
    - Opera (Mac, Linux, Windows)

    Web MIDI is not support under iOS (iPad, iPhone). It may work under Android but I did not test it.

- The Web MIDI is not blocked by the browser. See below for information about this feature in Chrome.

### Web MIDI in Chrome

The first time you access a web page that uses the WebMIDI API, the browser will ask you for permission.

![Chrome asks for MIDI permission](/images/screenshots/chrome-midi-ask.jpg "Chrome asks for MIDI permission")

You need to click "Allow" to authorize the application to use the Web MIDI API.

If you refuse access, the application will display the following message:

![MIDI access refused](/images/screenshots/message-midi-blocked.jpg "MIDI access refused")

    Waiting for MIDI interface access...
    ERROR: WebMidi could not be enabled.
           
You can change the permission at any time:

![Chrome change MIDI permission](/images/screenshots/chrome-midi-allow.jpg "Chrome change MIDI permission")

#### MIDI icon in the URL

Chrome display an icon in the URL to remind you that you are on a page that have access to MIDI. You can click this icon to access the MIDI permission settings.

![Chrome MIDI icon in URL](/images/screenshots/chrome-midi-url-icon.jpg "Chrome MIDI icon in URL")

![Chrome MIDI icon in URL](/images/screenshots/chrome-midi-url-icon-dialog.jpg "Chrome MIDI icon in URL")

    
#### MIDI configuration in the browser settings:    
    
You can also access the MIDI permissions via the browser Settings page. 

In Chrome, follow this path: Menu Settings / Advanced / Content settings / MIDI devices    

You can also open the Settings page and search for "MIDI".


Bluetooth MIDI
==============

A small Bluetooth MIDI adapter such as the [Quicco Sound mi.1](https://www.thomann.de/intl/quicco_sound_mi.1_wireless_midi_adapter.htm) 
or [Yamaha MD-BT01](https://www.thomann.de/intl/yamaha_md_bt01_wireless_midi_adapter.htm) is a very convenient way to connect the 
MIDI I/O interface to your computer. 

![Quicco Sound mi.1](/images/quicco_sound_mi1-33.jpg "Quicco Sound mi.1")

![Yamaha MD-BT01](/images/yamaha_md_bt01-33.jpg "Yamaha MD-BT01")

If you have a Mac, use the Audio MIDI Setup application. 

![Mac Audio Setup Application](/images/screenshots/mac-audio-setup.jpg "Mac Audio Setup Application")


--TODO: photo MIDI I/O with adapter--

 
MIDI tools
==========

If you use a Mac, check out the tools available at https://www.snoize.com/. 


Limitations of this editor
===============================

This editor will _not_ work in Firefox, Safari, IE or Edge because these browsers do not support the Web MIDI API. 

The editor will not work under iOS (iPad, iPhone). 

This editor has mainly been tested with Chrome on a MacBook pro running the latest OS release. Some tests have been 
done with success with Chrome under Linux Mint 17.1 and with Chrome under Windows 10. 

Still under active development. Feel free to log bugs/issues.  


Known issues
============

- Filter Type does not follow EXP.
- The TEMPO value is not accurate when set from the TAP switch.
- There's still some issues with the preset loading from a bookmarked URL.
- It is not possible to capture the press & hold of the TAP footswitch because the Enzo only sends a message for when 
the footswitch is pressed, but not for when it is released.
- Selecting a preset with EXP set to max in the editor does not reset EXP when the new setting is loaded.


Thanks
======

A big thank you to Meris for having provided precious information regarding the SysEx data. This editor could not have been so complete without their support.


Disclaimer and License
======================

This editor is not endorsed by, directly affiliated with, maintained, or sponsored by Meris.             

This editor is published under [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.en.html).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You can view and get a copy the license at https://www.gnu.org/licenses/licenses.en.html#GPL.

This editor is an Open Source project. You are welcome to contribute. The code is available at https://github.com/francoisgeorgy/enzo-web-editor.

To contribute your bug fixes, new features, etc.:
 
1. Fork the project.
2. Create a pull-request.

