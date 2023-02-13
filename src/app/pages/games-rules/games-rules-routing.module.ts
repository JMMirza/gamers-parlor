import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesRulesPage } from './games-rules.page';

const routes: Routes = [
  {
    path: '',
    component: GamesRulesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRulesPageRoutingModule {}
