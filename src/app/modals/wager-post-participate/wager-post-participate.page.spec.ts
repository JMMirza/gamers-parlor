import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WagerPostParticipatePage } from './wager-post-participate.page';

describe('WagerPostParticipatePage', () => {
  let component: WagerPostParticipatePage;
  let fixture: ComponentFixture<WagerPostParticipatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WagerPostParticipatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WagerPostParticipatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
