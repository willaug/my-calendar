import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const module = {
    declarations: [HomeComponent],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should create', () => {
    expect(component).toBeTruthy();
  });
});
