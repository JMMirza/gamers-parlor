import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingTeamMatchesListPageRoutingModule } from './ranking-team-matches-list-routing.module';

import { RankingTeamMatchesListPage } from './ranking-team-matches-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingTeamMatchesListPageRoutingModule
  ],
  declarations: [RankingTeamMatchesListPage]
})
export class RankingTeamMatchesListPageModule {}
