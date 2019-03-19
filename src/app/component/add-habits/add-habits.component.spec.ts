import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHabitsComponent } from './add-habits.component';

describe('AddHabitsComponent', () => {
  let component: AddHabitsComponent;
  let fixture: ComponentFixture<AddHabitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHabitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
