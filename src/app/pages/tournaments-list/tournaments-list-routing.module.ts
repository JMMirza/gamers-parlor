import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentsListPage } from './tournaments-list.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsListPageRoutingModule {}
