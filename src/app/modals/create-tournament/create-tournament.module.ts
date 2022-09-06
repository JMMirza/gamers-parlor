import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTournamentPageRoutingModule } from './create-tournament-routing.module';

import { CreateTournamentPage } from './create-tournament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateTournamentPageRoutingModule,
  ],
  declarations: [CreateTournamentPage],
})
export class CreateTournamentPageModule {}
