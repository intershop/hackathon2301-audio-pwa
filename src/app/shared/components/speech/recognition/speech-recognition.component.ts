import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SpeechError } from 'ish-shared/components/speech/model/speech-error.model';
import { SpeechEvent } from 'ish-shared/components/speech/model/speech-event.model';
import { SpeechNotification } from 'ish-shared/components/speech/model/speech-notification.model';
import { SpeechRecognizerService } from 'ish-shared/components/speech/service/speech-recognition-service.component';

@Component({
  selector: 'ish-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechRecognitionComponent implements OnInit {
  grammar = '#JSGF V1.0; grammar colors; public <search> = search for;';

  totalTranscript?: string;

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();

  constructor(private speechRecognizer: SpeechRecognizerService) {}

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

    this.defaultError$.next(undefined);
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

    this.errorMessage$ = merge(this.speechRecognizer.onError(), this.defaultError$).pipe(
      map(data => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }

  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      // this.actionContext.runAction(message, this.currentLanguage);
      this.totalTranscript = this.totalTranscript ? `${this.totalTranscript}\n${message}` : notification.content;
    }
  }
}
