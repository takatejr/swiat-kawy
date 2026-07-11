import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ONas } from './o-nas';

describe('ONas', () => {
  let component: ONas;
  let fixture: ComponentFixture<ONas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ONas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ONas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
