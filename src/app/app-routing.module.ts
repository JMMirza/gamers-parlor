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
  },  {
    path: 'my-tournaments',
    loadChildren: () => import('./pages/my-tournaments/my-tournaments.module').then( m => m.MyTournamentsPageModule)
  },
  {
    path: 'my-teams',
    loadChildren: () => import('./pages/my-teams/my-teams.module').then( m => m.MyTeamsPageModule)
  },
  {
    path: 'create-team',
    loadChildren: () => import('./modals/create-team/create-team.module').then( m => m.CreateTeamPageModule)
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


