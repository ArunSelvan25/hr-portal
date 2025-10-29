import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMasterPage } from './role-master-page';

describe('RoleMasterPage', () => {
  let component: RoleMasterPage;
  let fixture: ComponentFixture<RoleMasterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleMasterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
