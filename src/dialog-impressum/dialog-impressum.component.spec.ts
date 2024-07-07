import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImpressumComponent } from './dialog-impressum.component';

describe('DialogImpressumComponent', () => {
  let component: DialogImpressumComponent;
  let fixture: ComponentFixture<DialogImpressumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogImpressumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogImpressumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
