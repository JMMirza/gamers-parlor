import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LadderListPageRoutingModule } from './ladder-list-routing.module';

import { LadderListPage } from './ladder-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LadderListPageRoutingModule
  ],
  declarations: [LadderListPage]
})
export class LadderListPageModule {}
