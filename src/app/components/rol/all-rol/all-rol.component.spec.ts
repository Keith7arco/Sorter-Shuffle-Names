import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRolComponent } from './all-rol.component';

describe('AllRolComponent', () => {
  let component: AllRolComponent;
  let fixture: ComponentFixture<AllRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
