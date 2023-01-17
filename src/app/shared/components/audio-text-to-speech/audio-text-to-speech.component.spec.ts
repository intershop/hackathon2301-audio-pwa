import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTextToSpeechComponent } from './audio-text-to-speech.component';

describe('Audio Text To Speech Component', () => {
  let component: AudioTextToSpeechComponent;
  let fixture: ComponentFixture<AudioTextToSpeechComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioTextToSpeechComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTextToSpeechComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
