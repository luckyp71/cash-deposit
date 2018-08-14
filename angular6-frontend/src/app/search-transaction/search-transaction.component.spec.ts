import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTransactionComponent } from './search-transaction.component';

describe('SearchTransactionComponent', () => {
  let component: SearchTransactionComponent;
  let fixture: ComponentFixture<SearchTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
