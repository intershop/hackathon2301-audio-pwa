import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { AccountFacade } from 'ish-core/facades/account.facade';
import { whenTruthy } from 'ish-core/utils/operators';

@Component({
  selector: 'ish-audio-text-to-speech',
  templateUrl: './audio-text-to-speech.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioTextToSpeechComponent implements OnInit {
  constructor(private accountFacade: AccountFacade) {}

  ngOnInit() {
    this.accountFacade.user$.pipe(whenTruthy(), take(1)).subscribe(user => {
      const utterance = new SpeechSynthesisUtterance(
        `It's nice to see you again - ${user.firstName} ${user.lastName} !!!`
      );
      speechSynthesis.speak(utterance);
    });
  }
}
