import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LadderPostParticipatePage } from './ladder-post-participate.page';

describe('LadderPostParticipatePage', () => {
  let component: LadderPostParticipatePage;
  let fixture: ComponentFixture<LadderPostParticipatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LadderPostParticipatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LadderPostParticipatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
