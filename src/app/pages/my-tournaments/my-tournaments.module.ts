import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTournamentsPageRoutingModule } from './my-tournaments-routing.module';

import { MyTournamentsPage } from './my-tournaments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTournamentsPageRoutingModule
  ],
  declarations: [MyTournamentsPage]
})
export class MyTournamentsPageModule {}
