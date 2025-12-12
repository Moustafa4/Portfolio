import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjHome } from './proj-home';

describe('ProjHome', () => {
  let component: ProjHome;
  let fixture: ComponentFixture<ProjHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
