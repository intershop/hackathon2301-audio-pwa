import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioMidiCaptchaComponent } from './audio-midi-captcha.component';

describe('AudioMidiCaptchaComponent', () => {
  let component: AudioMidiCaptchaComponent;
  let fixture: ComponentFixture<AudioMidiCaptchaComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioMidiCaptchaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioMidiCaptchaComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
