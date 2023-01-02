import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingTeamMatchesListPage } from './ranking-team-matches-list.page';

describe('RankingTeamMatchesListPage', () => {
  let component: RankingTeamMatchesListPage;
  let fixture: ComponentFixture<RankingTeamMatchesListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingTeamMatchesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingTeamMatchesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
