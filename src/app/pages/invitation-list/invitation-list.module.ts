import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationListPageRoutingModule } from './invitation-list-routing.module';

import { InvitationListPage } from './invitation-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationListPageRoutingModule
  ],
  declarations: [InvitationListPage]
})
export class InvitationListPageModule {}
