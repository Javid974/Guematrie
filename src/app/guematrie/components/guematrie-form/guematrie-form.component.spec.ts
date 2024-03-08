import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GuematrieFormComponent } from './guematrie-form.component';

describe('GuematrieFormComponent', () => {
  let component: GuematrieFormComponent;
  let fixture: ComponentFixture<GuematrieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuematrieFormComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GuematrieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
