import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { AccountFacade } from 'ish-core/facades/account.facade';
import { whenTruthy } from 'ish-core/utils/operators';

@Component({
  selector: 'ish-audio-text-to-speech',
  templateUrl: './audio-text-to-speech.component.html',
  styleUrls: ['./audio-text-to-speech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioTextToSpeechComponent implements OnInit {
  constructor(private accountFacade: AccountFacade) {}

  static alreadySaid: string = 'dorina';

  ngOnInit() {
    this.accountFacade.user$.pipe(whenTruthy(), take(1)).subscribe(user => {
      const utterance = new SpeechSynthesisUtterance(
        `Hello! It's nice to see you again - ${user.firstName} ${user.lastName} !!!`
      );
      if (AudioTextToSpeechComponent.alreadySaid !== user.firstName)
      {
        speechSynthesis.speak(utterance);
        AudioTextToSpeechComponent.alreadySaid = user.firstName;
      }
    });
  }

  playDailyReport() {
    const utterance = new SpeechSynthesisUtterance(
      `This is your daily report: Budget is as usual. You have 6 requisitions which need to be approved.`
    );
    speechSynthesis.speak(utterance);
  }
}
