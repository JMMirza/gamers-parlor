import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',

    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'my-tournaments',
    loadChildren: () =>
      import('./pages/my-tournaments/my-tournaments.module').then(
        (m) => m.MyTournamentsPageModule
      ),
  },
  {
    path: 'my-teams',
    loadChildren: () =>
      import('./pages/my-teams/my-teams.module').then(
        (m) => m.MyTeamsPageModule
      ),
  },
  {
    path: 'create-team',
    loadChildren: () =>
      import('./modals/create-team/create-team.module').then(
        (m) => m.CreateTeamPageModule
      ),
  },
  {
    path: 'create-wagers',
    loadChildren: () =>
      import('./modals/create-wagers/create-wagers.module').then(
        (m) => m.CreateWagersPageModule
      ),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./modals/edit-profile/edit-profile.module').then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: 'create-tournament',
    loadChildren: () =>
      import('./modals/create-tournament/create-tournament.module').then(
        (m) => m.CreateTournamentPageModule
      ),
  },  {
    path: 'participate-tournament',
    loadChildren: () => import('./pages/participate-tournament/participate-tournament.module').then( m => m.ParticipateTournamentPageModule)
  },
  {
    path: 'team-list',
    loadChildren: () => import('./modals/team-list/team-list.module').then( m => m.TeamListPageModule)
  },
  {
    path: 'wager-post-participate',
    loadChildren: () => import('./modals/wager-post-participate/wager-post-participate.module').then( m => m.WagerPostParticipatePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
