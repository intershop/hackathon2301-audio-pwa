import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ish-audio-midi',
  templateUrl: './audio-midi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioMidiComponent implements OnInit {

 
  ngOnInit() {
    if (navigator.requestMIDIAccess) {
      console.log('This browser supports WebMIDI!');
    } else {
      console.log('WebMIDI is not supported in this browser.');
    }

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

    function onMIDISuccess(midiAccess) {
      console.log(midiAccess);

      const inputs = midiAccess.inputs;
      const outputs = midiAccess.outputs;

      for (const input of midiAccess.inputs.values()) input.onmidimessage = getMIDIMessage;
    }

    function onMIDIFailure() {
      console.log('Could not access your MIDI devices.');
    }

    let myMap = new Map<string, number>();

    function getMIDIMessage(message) {
      // console.log(midiMessage);

      const command = message.data[0];
      const note = message.data[1];
      const velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

      //---------MY ACCOUNT ----------------
      switch (command) {
        case 144: // noteOn
        {
          console.log(note);
          const box = document.getElementById(note) as HTMLDivElement | null;          
          box?.setAttribute('style', 'background: #d5d5d5'); // none repeat scroll 0 0);
          myMap.set(note, Date.now());
          break;
        }
        case 128: 
        {
          const box = document.getElementById(note) as HTMLDivElement | null;
          box?.removeAttribute('style');
          let noteOnDate = myMap.get(note);
          let noteOffDate = Date.now();
          if (noteOffDate-noteOnDate > 2000)
          {
            console.log('lange');
            console.log(box?.firstChild);
            const link = box?.firstChild as HTMLLinkElement | null;
            link.click();
          }
          myMap.delete(note);
          break;
        }
      }
      //---------MY ACCOUNT ----------------
      /*switch (command) {
        case 144: // noteOn
          if (velocity > 0) {
            console.log(note, velocity);

            const box = document.getElementById(note) as HTMLDivElement | null;
            box?.setAttribute('style', 'background-color: #000');
          } else {
            console.log(note);

            const box = document.getElementById(note) as HTMLDivElement | null;
            box?.setAttribute('style', 'background-color: #00');
          }
          break;
        case 128: // noteOff
          console.log(note);

          const box = document.getElementById(note) as HTMLDivElement | null;
          box?.setAttribute('style', 'background-color: #eee');

          break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
      }*/
    }
  }
}
