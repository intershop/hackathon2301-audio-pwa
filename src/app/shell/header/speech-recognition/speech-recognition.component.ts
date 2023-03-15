import { ChangeDetectionStrategy, Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SpeechEvent, SpeechNotification, SpeechRecognizerConfiguration } from 'ish-core/models/speech/speech.model';
import { SpeechRecognizerService } from 'ish-core/utils/speech-recognizer/speech-recognizer.service';

export const SPEECH_RECOGNIZER_CONFIGURATION = new InjectionToken<SpeechRecognizerConfiguration>(
  'Speech Recognizer Configuration'
);

@Component({
  selector: 'ish-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechRecognitionComponent implements OnInit {
  searchTrigger = ['search for product ', 'search for a ', 'search for'];
  grammar = '#JSGF V1.0; grammar search; public <search-rule> = search for;';

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;

  constructor(
    private speechRecognizer: SpeechRecognizerService,
    @Inject(SPEECH_RECOGNIZER_CONFIGURATION) private speechRecognizerConfiguration: SpeechRecognizerConfiguration[]
  ) {}

  ngOnInit() {
    const webSpeechReady = this.speechRecognizer.initialize('en-US');
    if (webSpeechReady) {
      console.log('Browser IS supported');
      this.speechRecognizer.addGrammar(this.grammar, 1);
      this.initRecognition();
    } else {
      console.log('Browser NOT supported');
    }
  }

  start(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.speechRecognizer.start();
  }

  stop(): void {
    this.speechRecognizer.stop();
  }

  private initRecognition(): void {
    this.transcript$ = this.speechRecognizer.onResult().pipe(
      tap(notification => {
        this.processNotification(notification);
      }),
      map(notification => notification.content || '')
    );

    this.listening$ = merge(this.speechRecognizer.onStart(), this.speechRecognizer.onEnd()).pipe(
      map(notification => notification.event === SpeechEvent.Start)
    );
  }

  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const recognizer = this.speechRecognizerConfiguration.find(recognizer =>
        recognizer.isTriggered(notification.content)
      );

      if (recognizer) {
        recognizer.processor(notification.content);
        this.stop();
      }
    }
  }
}
