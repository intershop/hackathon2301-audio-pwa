import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { SpeechError } from 'ish-shell/header/speech/model/speech-error.model';
import { SpeechEvent } from 'ish-shell/header/speech/model/speech-event.model';
import { SpeechNotification } from 'ish-shell/header/speech/model/speech-notification.model';

@Injectable({
  providedIn: 'root',
})
export class SpeechRecognizerService {
  recognition!: SpeechRecognition;
  grammarList!: SpeechGrammarList;
  language!: string;
  grammar!: string;
  isListening = false;

  constructor(private ngZone: NgZone) {}

  initialize(language: string): boolean {
    if (!SSR && 'webkitSpeechRecognition' in window && 'webkitSpeechGrammarList' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 3;
      this.setLanguage(language);
      this.grammarList = new webkitSpeechGrammarList();
      this.recognition.grammars = this.grammarList;
      return true;
    }

    return false;
  }

  setLanguage(language: string): void {
    this.language = language;
    this.recognition.lang = language;
  }

  addGrammar(grammar: string, weight: number): void {
    this.grammarList.addFromString(grammar, weight);
    this.recognition.grammars = this.grammarList;
  }

  start(): void {
    if (!this.recognition) {
      return;
    }

    this.recognition.start();
    this.isListening = true;
  }

  onStart(): Observable<SpeechNotification<never>> {
    if (!this.recognition) {
      this.initialize(this.language);
    }

    return new Observable(observer => {
      this.recognition.onstart = () => {
        this.ngZone.run(() => {
          observer.next({
            event: SpeechEvent.Start,
          });
        });
      };
    });
  }

  onEnd(): Observable<SpeechNotification<never>> {
    return new Observable(observer => {
      this.recognition.onend = () => {
        this.ngZone.run(() => {
          observer.next({
            event: SpeechEvent.End,
          });
          this.isListening = false;
        });
      };
    });
  }

  onResult(): Observable<SpeechNotification<string[]>> {
    return new Observable(observer => {
      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const interimContent = '';
        let finalContent: string[] = [];

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const content: string[] = [];

            if (finalContent.length) {
              finalContent.forEach(el => {
                for (let j = 0; j < event.results[i].length; j++) {
                  content.push(`${el}${event.results[i][j].transcript}`);
                }
              });
            } else {
              for (let j = 0; j < event.results[i].length; j++) {
                content.push(event.results[i][j].transcript);
              }
            }

            finalContent = content;

            this.ngZone.run(() => {
              observer.next({
                event: SpeechEvent.FinalContent,
                content: finalContent,
              });
            });
          } else {
            const content: string[] = [];

            for (let j = 0; j < event.results[i].length; j++) {
              content.push(event.results[i][j].transcript);
            }
            // console.log('interim transcript', event, interimContent);
            this.ngZone.run(() => {
              observer.next({
                event: SpeechEvent.InterimContent,
                content,
              });
            });
          }
        }
      };
    });
  }

  onError(): Observable<SpeechNotification<never>> {
    return new Observable(observer => {
      this.recognition.onerror = event => {
        const eventError: string = (event as any).error;
        console.log('error', eventError);
        let error: SpeechError;
        switch (eventError) {
          case 'no-speech':
            error = SpeechError.NoSpeech;
            break;
          case 'audio-capture':
            error = SpeechError.AudioCapture;
            break;
          case 'not-allowed':
            error = SpeechError.NotAllowed;
            break;
          default:
            error = SpeechError.Unknown;
            break;
        }

        this.ngZone.run(() => {
          observer.next({
            error,
          });
        });
      };
    });
  }

  stop(): void {
    this.recognition.stop();
  }
}
