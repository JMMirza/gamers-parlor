import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WagerRequestsPageRoutingModule } from './wager-requests-routing.module';

import { WagerRequestsPage } from './wager-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WagerRequestsPageRoutingModule
  ],
  declarations: [WagerRequestsPage]
})
export class WagerRequestsPageModule {}
