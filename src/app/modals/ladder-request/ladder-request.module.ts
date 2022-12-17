import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LadderRequestPageRoutingModule } from './ladder-request-routing.module';

import { LadderRequestPage } from './ladder-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LadderRequestPageRoutingModule
  ],
  declarations: [LadderRequestPage]
})
export class LadderRequestPageModule {}
