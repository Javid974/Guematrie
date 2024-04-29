import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTarotComponent } from './admin-add-tarot.component';

describe('AdminAddTarotComponent', () => {
  let component: AdminAddTarotComponent;
  let fixture: ComponentFixture<AdminAddTarotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddTarotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddTarotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
