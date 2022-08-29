import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWagersPage } from './create-wagers.page';

const routes: Routes = [
  {
    path: '',
    component: CreateWagersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateWagersPageRoutingModule {}
