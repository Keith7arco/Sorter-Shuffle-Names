import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPersonComponent } from './all-person.component';

describe('AllPersonComponent', () => {
  let component: AllPersonComponent;
  let fixture: ComponentFixture<AllPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
