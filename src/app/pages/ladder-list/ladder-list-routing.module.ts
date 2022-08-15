import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LadderListPage } from './ladder-list.page';

const routes: Routes = [
  {
    path: '',
    component: LadderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LadderListPageRoutingModule {}
