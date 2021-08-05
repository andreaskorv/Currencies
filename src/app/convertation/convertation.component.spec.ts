import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertationComponent } from './convertation.component';

describe('ConvertationComponent', () => {
  let component: ConvertationComponent;
  let fixture: ComponentFixture<ConvertationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
