import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyCreditsPageRoutingModule } from './buy-credits-routing.module';

import { BuyCreditsPage } from './buy-credits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BuyCreditsPageRoutingModule,
  ],
  declarations: [BuyCreditsPage],
})
export class BuyCreditsPageModule {}
