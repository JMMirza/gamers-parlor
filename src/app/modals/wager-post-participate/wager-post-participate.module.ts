import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WagerPostParticipatePageRoutingModule } from './wager-post-participate-routing.module';

import { WagerPostParticipatePage } from './wager-post-participate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WagerPostParticipatePageRoutingModule,
  ],
  declarations: [WagerPostParticipatePage],
})
export class WagerPostParticipatePageModule {}
