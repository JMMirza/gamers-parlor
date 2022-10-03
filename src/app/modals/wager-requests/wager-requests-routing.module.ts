import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WagerRequestsPage } from './wager-requests.page';

const routes: Routes = [
  {
    path: '',
    component: WagerRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WagerRequestsPageRoutingModule {}
