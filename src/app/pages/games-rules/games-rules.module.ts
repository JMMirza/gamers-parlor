import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesRulesPageRoutingModule } from './games-rules-routing.module';

import { GamesRulesPage } from './games-rules.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesRulesPageRoutingModule
  ],
  declarations: [GamesRulesPage]
})
export class GamesRulesPageModule {}
