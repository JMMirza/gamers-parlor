import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentResultPagePageRoutingModule } from './tournament-result-page-routing.module';

import { TournamentResultPagePage } from './tournament-result-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentResultPagePageRoutingModule
  ],
  declarations: [TournamentResultPagePage]
})
export class TournamentResultPagePageModule {}
