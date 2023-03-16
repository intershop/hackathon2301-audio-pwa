import { ChangeDetectorRef, Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { SPEECH_RECOGNITION_COMPATIBLE } from 'ish-core/utils/speech-recognizer/speech-recognizer.service';

@Directive({
  selector: '[ishSpeechRecognitionAccess]',
})
export class SpeechRecognitionAccessDirective implements OnInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>
  ) {}

  ngOnInit(): void {
    if (SPEECH_RECOGNITION_COMPATIBLE) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

    this.cdRef.markForCheck();
  }
}
