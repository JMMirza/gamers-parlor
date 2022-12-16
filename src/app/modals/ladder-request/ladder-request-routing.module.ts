import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LadderRequestPage } from './ladder-request.page';

const routes: Routes = [
  {
    path: '',
    component: LadderRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LadderRequestPageRoutingModule {}
