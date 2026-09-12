import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertForm } from './alert-form';

describe('AlertForm', () => {
  let component: AlertForm;
  let fixture: ComponentFixture<AlertForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
