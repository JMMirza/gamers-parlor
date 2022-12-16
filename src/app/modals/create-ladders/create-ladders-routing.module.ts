import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLaddersPage } from './create-ladders.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLaddersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLaddersPageRoutingModule {}
