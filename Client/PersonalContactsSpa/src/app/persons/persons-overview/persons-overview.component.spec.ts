import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsOverviewComponent } from './persons-overview.component';

describe('PersonsOverviewComponent', () => {
  let component: PersonsOverviewComponent;
  let fixture: ComponentFixture<PersonsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
