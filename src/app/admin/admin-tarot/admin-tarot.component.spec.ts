import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarotComponent } from './admin-tarot.component';

describe('TarotComponent', () => {
  let component: TarotComponent;
  let fixture: ComponentFixture<TarotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
