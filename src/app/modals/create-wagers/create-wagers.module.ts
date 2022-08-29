import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateWagersPageRoutingModule } from './create-wagers-routing.module';

import { CreateWagersPage } from './create-wagers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWagersPageRoutingModule
  ],
  declarations: [CreateWagersPage]
})
export class CreateWagersPageModule {}
