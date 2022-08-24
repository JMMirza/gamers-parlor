import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsListPageRoutingModule } from './tournaments-list-routing.module';

import { TournamentsListPage } from './tournaments-list.page';

import { SwiperModule } from 'swiper/angular';

import { VipTournamentCardComponent } from '../../components/vip-tournament-card/vip-tournament-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsListPageRoutingModule,
    SwiperModule
  ],
  declarations: [TournamentsListPage, VipTournamentCardComponent]
})
export class TournamentsListPageModule {}
