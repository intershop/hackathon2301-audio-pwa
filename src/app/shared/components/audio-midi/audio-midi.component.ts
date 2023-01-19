import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
@Component({
  selector: 'ish-audio-midi',
  templateUrl: './audio-midi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioMidiComponent implements OnInit {

  static interval: any;
  static lastSaid: string = 'My Account';

  ngOnDestroy()
  {
    clearInterval(AudioMidiComponent.interval);
  }

  ngOnInit() {
    //this.interval = window.setInterval(()=>checkForButtonInterval() , 100);
    var myMap = new Map<string, number>();
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
      const command = message.data[0];
      const note = message.data[1];
      this.note = note;
      const velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

      //---------MY ACCOUNT ----------------
      switch (command) {
        case 144: // noteOn
        {
          //console.log(note+myMap.size);
          const box = document.getElementById(note) as HTMLDivElement | null;
          box?.setAttribute('style', 'background: #d5d5d5'); // none repeat scroll 0 0);
          //myMap.set(note, Date.now());
          if (myMap.get(note) === undefined)
          {
            myMap.set(note, Date.now());
            if (myMap.size == 1)
            {
              AudioMidiComponent.interval = window.setInterval(()=>checkForButtonInterval() , 100);
            }
          }
          break;
        }
        case 128: // noteOff
        {
          const box = document.getElementById(note) as HTMLDivElement | null;
          box?.removeAttribute('style');

          myMap.delete(note);
          if (myMap.size == 0)
          {
            clearInterval(AudioMidiComponent.interval);
          }
          break;
        }
      }
      //---------MY ACCOUNT ----------------
      
    }

    function checkForButtonInterval()
      {
        if (myMap.size === 1) 
        {
          //console.log('drin')
          myMap.forEach((time: number, note: string) => {
            const box = document.getElementById(note) as HTMLDivElement | null;
            if (Date.now()-time > 500 && Date.now()-time < 580)
            {
              const sayNow = box?.firstChild.textContent;
              console.log(sayNow + ' ' + AudioMidiComponent.lastSaid);
              if (sayNow != AudioMidiComponent.lastSaid && sayNow != 'Logout')
              {
                speechSynthesis.speak(new SpeechSynthesisUtterance(sayNow));
                AudioMidiComponent.lastSaid=sayNow;
              }
              /*else{
                console.log('gleich');
              }*/
            }
            else if (Date.now()-time > 2000)
            {
              const link = box?.firstChild as HTMLLinkElement | null;
              link.click();
            }
          });
        }
      }
  }
}
