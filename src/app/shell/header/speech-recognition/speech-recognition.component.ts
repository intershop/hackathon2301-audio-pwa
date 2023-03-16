import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ish-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechRecognitionComponent {
  listening: boolean;
  transcript: string;

  onListening(listening: boolean) {
    this.listening = listening;
  }

  onTranscriptChange(transcript: string) {
    this.transcript = transcript;
  }
}
