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
  },
  {
    path: 'participate-tournament/:tournamentId',
    loadChildren: () =>
      import(
        './pages/participate-tournament/participate-tournament.module'
      ).then((m) => m.ParticipateTournamentPageModule),
  },
  {
    path: 'team-list',
    loadChildren: () =>
      import('./modals/team-list/team-list.module').then(
        (m) => m.TeamListPageModule
      ),
  },
  {
    path: 'wager-post-participate',
    loadChildren: () =>
      import(
        './modals/wager-post-participate/wager-post-participate.module'
      ).then((m) => m.WagerPostParticipatePageModule),
  },
  {
    path: 'buy-credits',
    loadChildren: () =>
      import('./pages/buy-credits/buy-credits.module').then(
        (m) => m.BuyCreditsPageModule
      ),
  },
  {
    path: 'wager-requests',
    loadChildren: () =>
      import('./modals/wager-requests/wager-requests.module').then(
        (m) => m.WagerRequestsPageModule
      ),
  },
  {
    path: 'my-matches',
    loadChildren: () =>
      import('./modals/my-matches/my-matches.module').then(
        (m) => m.MyMatchesPageModule
      ),
  },
  {
    path: 'tournament-result-page',
    loadChildren: () =>
      import(
        './pages/tournament-result-page/tournament-result-page.module'
      ).then((m) => m.TournamentResultPagePageModule),
  },
  {
    path: 'subscription-list',
    loadChildren: () =>
      import('./pages/subscription-list/subscription-list.module').then(
        (m) => m.SubscriptionListPageModule
      ),
  },
  {
    path: 'members-list',
    loadChildren: () =>
      import('./modals/members-list/members-list.module').then(
        (m) => m.MembersListPageModule
      ),
  },
  {
    path: 'create-ladders',
    loadChildren: () =>
      import('./modals/create-ladders/create-ladders.module').then(
        (m) => m.CreateLaddersPageModule
      ),
  },
  {
    path: 'ladder-post-participate',
    loadChildren: () =>
      import(
        './modals/ladder-post-participate/ladder-post-participate.module'
      ).then((m) => m.LadderPostParticipatePageModule),
  },  {
    path: 'ladder-request',
    loadChildren: () => import('./modals/ladder-request/ladder-request.module').then( m => m.LadderRequestPageModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./pages/ranking/ranking.module').then( m => m.RankingPageModule)
  },
  {
    path: 'ranking-team-matches-list',
    loadChildren: () => import('./modals/ranking-team-matches-list/ranking-team-matches-list.module').then( m => m.RankingTeamMatchesListPageModule)
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
