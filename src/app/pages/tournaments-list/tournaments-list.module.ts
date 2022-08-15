import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsListPageRoutingModule } from './tournaments-list-routing.module';

import { TournamentsListPage } from './tournaments-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsListPageRoutingModule
  ],
  declarations: [TournamentsListPage]
})
export class TournamentsListPageModule {}
