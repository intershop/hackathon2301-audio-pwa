import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { SpeechEvent, SpeechNotification, SpeechRecognizerConfiguration } from 'ish-core/models/speech/speech.model';
import { SpeechRecognizerService } from 'ish-core/utils/speech-recognizer/speech-recognizer.service';

export const SPEECH_RECOGNIZER_CONFIGURATION = new InjectionToken<SpeechRecognizerConfiguration>(
  'Speech Recognizer Configuration'
);

@Directive({
  selector: '[ishSpeechRecognition]',
})
export class SpeechRecognitionDirective implements OnInit, OnDestroy {
  searchTrigger = ['search for product ', 'search for a ', 'search for'];
  grammar = '#JSGF V1.0; grammar search; public <search-rule> = search for;';

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;

  @Output() isListening = new EventEmitter<boolean>();
  @Output() transcriptChange = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  constructor(
    private speechRecognizer: SpeechRecognizerService,
    private elementRef: ElementRef,
    @Inject(SPEECH_RECOGNIZER_CONFIGURATION) private speechRecognizerConfiguration: SpeechRecognizerConfiguration[]
  ) {}

  ngOnInit(): void {
    const webSpeechReady = this.speechRecognizer.initialize('en-US');
    if (webSpeechReady) {
      console.log('Browser IS supported');
      this.speechRecognizer.addGrammar(this.grammar, 1);
      this.initRecognition();
    } else {
      console.log('Browser NOT supported');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // go along path of click but not further up than self
    for (let el = event.target as HTMLElement; el && el !== this.elementRef.nativeElement; el = el.parentElement) {
      switch (el.id) {
        case 'startSpeech':
          this.start();
          break;
        case 'stopSpeech':
          this.stop();
          break;
      }
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
    this.transcriptChange.emit(undefined);
  }

  private initRecognition(): void {
    this.speechRecognizer
      .onResult()
      .pipe(
        tap(notification => {
          this.processNotification(notification);
        }),
        map(notification => notification.content || ''),
        takeUntil(this.destroy$)
      )
      .subscribe(transcript => this.transcriptChange.emit(transcript));

    merge(this.speechRecognizer.onStart(), this.speechRecognizer.onEnd())
      .pipe(
        map(notification => notification.event === SpeechEvent.Start),
        takeUntil(this.destroy$)
      )
      .subscribe(listening => this.isListening.emit(listening));
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
