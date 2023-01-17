import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioMidiComponent } from './audio-midi.component';

describe('AudioMidiComponent', () => {
  let component: AudioMidiComponent;
  let fixture: ComponentFixture<AudioMidiComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioMidiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioMidiComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
