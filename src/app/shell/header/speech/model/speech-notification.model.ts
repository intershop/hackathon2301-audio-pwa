import { SpeechError } from './speech-error.model';
import { SpeechEvent } from './speech-event.model';

export interface SpeechNotification<T> {
  event?: SpeechEvent;
  error?: SpeechError;
  content?: T;
}
