import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingTeamMatchesListPage } from './ranking-team-matches-list.page';

const routes: Routes = [
  {
    path: '',
    component: RankingTeamMatchesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingTeamMatchesListPageRoutingModule {}
