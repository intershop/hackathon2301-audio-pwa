import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionItemComponent } from './accordion-item.component';

describe('Accordion Item Component', () => {
  let component: AccordionItemComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<AccordionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CollapseModule],
      declarations: [AccordionItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionItemComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should show panel body when click on panel header', () => {
    const headingLinks = element.querySelectorAll('.panel-heading');
    (headingLinks[0] as HTMLElement).click();
    fixture.detectChanges();
    expect(element.querySelector('.glyphicon-minus')).toBeTruthy();
    expect(component.isCollapsed).toBeTruthy();
  });

  it('should hide panel body when click on panel header again', () => {
    const headingLinks = element.querySelectorAll('.panel-heading');
    (headingLinks[0] as HTMLElement).click();
    (headingLinks[0] as HTMLElement).click();
    fixture.detectChanges();
    expect(element.querySelector('.glyphicon-plus')).toBeTruthy();
    expect(component.isCollapsed).toBeFalsy();
  });
});
