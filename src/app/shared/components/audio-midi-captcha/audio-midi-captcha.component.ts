import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ish-audio-midi-captcha',
  templateUrl: './audio-midi-captcha.component.html',
  styleUrls: ['./audio-midi-captcha.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioMidiCaptchaComponent implements OnInit {
  ngOnInit() {
    // const loginButton = document.getElementById('login-button') as HTMLDivElement | null;
    // loginButton?.setAttribute('disabled', '');

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

    function getMIDIMessage(message) {
      // console.log(midiMessage);

      const command = message.data[0];
      const note = message.data[1];
      const velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

      switch (command) {
        case 144: // noteOn
          console.log('noteOn');
          console.log(note, velocity);

          // removed velocity
          // if (velocity > 0 && velocity < 90) {
          if (velocity > 0 && velocity < 200) {
            console.log('too low');

            if (document.getElementById(`note${note}`) !== null) {
              const box = document.getElementById(`note${note}`) as HTMLDivElement | null;
              // removed velocity
              // addClass('success-medium', box);
              addClass('success-check', box);
            } else {
              const boxWrong = document.getElementById(`note-wrong`) as HTMLDivElement | null;
              addClass('error', boxWrong);
            }
          } else {
            console.log('above');
            console.log(note, velocity);
            console.log(`note${note}`);

            if (document.getElementById(`note${note}`) !== null) {
              const box = document.getElementById(`note${note}`) as HTMLDivElement | null;
              addClass('success', box);
              addClass('success-check', box);
            } else {
              const boxWrong = document.getElementById(`note-wrong`) as HTMLDivElement | null;
              addClass('error', boxWrong);
            }
          }

          break;
        case 128: // noteOff
          console.log('noteOff');
          console.log(note, velocity);

          // const box = document.getElementById(`note${note}`) as HTMLDivElement | null;
          // removeClass('success', box);

          if (document.getElementById(`note${note}`) !== null) {
            const box = document.getElementById(`note${note}`) as HTMLDivElement | null;
            removeClass('success', box);
            removeClass('success-medium', box);
          } else {
            const boxWrong = document.getElementById(`note-wrong`) as HTMLDivElement | null;
            removeClass('error', boxWrong);
            removeClass('success-medium', boxWrong);
            console.log('wrong');
          }

          break;
      }
    }
    function addClass(className: string, obj: any) {
      obj.className += ` ${className}`;
    }

    function removeClass(className: string, obj: any) {
      obj.classList.remove(className);
    }
  }
}
