import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksgridComponent } from './stocksgrid.component';

describe('StocksgridComponent', () => {
  let component: StocksgridComponent;
  let fixture: ComponentFixture<StocksgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
