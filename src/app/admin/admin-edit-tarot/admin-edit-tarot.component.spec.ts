import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTarotComponent } from './admin-edit-tarot.component';

describe('AdminEditTarotComponent', () => {
  let component: AdminEditTarotComponent;
  let fixture: ComponentFixture<AdminEditTarotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditTarotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditTarotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
