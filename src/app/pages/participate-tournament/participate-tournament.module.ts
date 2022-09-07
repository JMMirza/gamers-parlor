import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipateTournamentPageRoutingModule } from './participate-tournament-routing.module';

import { ParticipateTournamentPage } from './participate-tournament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipateTournamentPageRoutingModule
  ],
  declarations: [ParticipateTournamentPage]
})
export class ParticipateTournamentPageModule {}
