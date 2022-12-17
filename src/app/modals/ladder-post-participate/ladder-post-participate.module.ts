import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LadderPostParticipatePageRoutingModule } from './ladder-post-participate-routing.module';

import { LadderPostParticipatePage } from './ladder-post-participate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LadderPostParticipatePageRoutingModule,
  ],
  declarations: [LadderPostParticipatePage],
})
export class LadderPostParticipatePageModule {}
