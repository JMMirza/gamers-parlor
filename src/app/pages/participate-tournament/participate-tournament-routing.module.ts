import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipateTournamentPage } from './participate-tournament.page';

const routes: Routes = [
  {
    path: '',
    component: ParticipateTournamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipateTournamentPageRoutingModule {}
