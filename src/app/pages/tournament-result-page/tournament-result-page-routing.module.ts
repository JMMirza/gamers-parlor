import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentResultPagePage } from './tournament-result-page.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentResultPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentResultPagePageRoutingModule {}
