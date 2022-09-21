import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyCreditsPage } from './buy-credits.page';

const routes: Routes = [
  {
    path: '',
    component: BuyCreditsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyCreditsPageRoutingModule {}
