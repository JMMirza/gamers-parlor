import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LadderPostParticipatePage } from './ladder-post-participate.page';

const routes: Routes = [
  {
    path: '',
    component: LadderPostParticipatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LadderPostParticipatePageRoutingModule {}
