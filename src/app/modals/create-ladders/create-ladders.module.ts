import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateLaddersPageRoutingModule } from './create-ladders-routing.module';

import { CreateLaddersPage } from './create-ladders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateLaddersPageRoutingModule,
  ],
  declarations: [CreateLaddersPage],
})
export class CreateLaddersPageModule {}
