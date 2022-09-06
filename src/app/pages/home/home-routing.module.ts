import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'tournaments-list',
        loadChildren: () =>
          import('../../pages/tournaments-list/tournaments-list.module').then(
            (m) => m.TournamentsListPageModule
          ),
      },
      {
        path: 'wager-list',
        loadChildren: () =>
          import('../../pages/wager-list/wager-list.module').then(
            (m) => m.WagerListPageModule
          ),
      },
      {
        path: 'ladder-list',
        loadChildren: () =>
          import('../../pages/ladder-list/ladder-list.module').then(
            (m) => m.LadderListPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/home/tournaments-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/tournaments-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
