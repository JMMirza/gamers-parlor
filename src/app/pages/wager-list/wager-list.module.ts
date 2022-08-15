import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WagerListPageRoutingModule } from './wager-list-routing.module';

import { WagerListPage } from './wager-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WagerListPageRoutingModule
  ],
  declarations: [WagerListPage]
})
export class WagerListPageModule {}
