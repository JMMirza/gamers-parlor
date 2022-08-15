import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WagerListPage } from './wager-list.page';

const routes: Routes = [
  {
    path: '',
    component: WagerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WagerListPageRoutingModule {}
