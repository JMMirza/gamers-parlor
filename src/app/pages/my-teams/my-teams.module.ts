import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTeamsPageRoutingModule } from './my-teams-routing.module';

import { MyTeamsPage } from './my-teams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyTeamsPageRoutingModule,
  ],
  declarations: [MyTeamsPage],
})
export class MyTeamsPageModule {}
