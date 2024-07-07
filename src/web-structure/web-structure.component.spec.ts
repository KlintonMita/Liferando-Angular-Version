import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebStructureComponent } from './web-structure.component';

describe('WebStructureComponent', () => {
  let component: WebStructureComponent;
  let fixture: ComponentFixture<WebStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebStructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
