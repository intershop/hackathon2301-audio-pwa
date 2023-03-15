export enum SpeechError {
  NoSpeech = 'no-speech',
  AudioCapture = 'audio-capture',
  NotAllowed = 'not-allowed',
  Unknown = 'unknown',
}

export enum SpeechEvent {
  Start,
  End,
  FinalContent,
  InterimContent,
}

export interface SpeechNotification<T> {
  event?: SpeechEvent;
  error?: SpeechError;
  content?: T;
}

export interface SpeechRecognizerConfiguration {
  isTriggered(transcript: string): boolean;
  processor(recognition: string): void;
}
