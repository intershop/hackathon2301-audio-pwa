import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SPEECH_RECOGNIZER_CONFIGURATION } from 'ish-core/directives/speech-recognition.directive';
import { ProductContextFacade } from 'ish-core/facades/product-context.facade';

@Component({
  selector: 'ish-product-speach-to-action',
  templateUrl: './product-speach-to-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SPEECH_RECOGNIZER_CONFIGURATION,
      multi: true,
      useFactory: () => {
        const context = inject(ProductContextFacade);
        return {
          isTriggered: (transcript: string) => transcript?.toLowerCase().startsWith('add to cart'),
          processor: () => context.addToBasket(),
        };
      },
    },
  ],
})
export class ProductSpeachToActionComponent {
  listening: boolean;
  transcript: string;

  onListening(listening: boolean) {
    this.listening = listening;
  }

  onTranscriptChange(transcript: string) {
    this.transcript = transcript;
  }
}
