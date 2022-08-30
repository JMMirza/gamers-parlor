import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateWagersPageRoutingModule } from './create-wagers-routing.module';
import { CreateWagersPage } from './create-wagers.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateWagersPageRoutingModule,
  ],
  declarations: [CreateWagersPage],
})
export class CreateWagersPageModule {}
