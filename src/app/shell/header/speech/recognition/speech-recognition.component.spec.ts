import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRecognitionComponent } from './speech-recognition.component';

describe('Speech Recognition Component', () => {
  let component: SpeechRecognitionComponent;
  let fixture: ComponentFixture<SpeechRecognitionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeechRecognitionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRecognitionComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
