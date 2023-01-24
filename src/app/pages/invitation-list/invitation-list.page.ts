import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTeamsService } from '../../services/my-teams.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.page.html',
  styleUrls: ['./invitation-list.page.scss'],
})
export class InvitationListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;
  constructor(
    private myTeamsService: MyTeamsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.listTeamInvites();
  }

  async listTeamInvites() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.myTeamsService.listTeamInvite().subscribe(
      (data: any) => {
        console.log(data);
        this.response = data;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  async acceptTeamInvite(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.myTeamsService.acceptTeamInvite({ id: id }).subscribe(
      (data: any) => {
        console.log(data);
        // this.response = data;
        loading.dismiss();
        this.listTeamInvites();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  async rejectTeamInvite(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.myTeamsService.rejectTeamInvite({ id: id }).subscribe(
      (data: any) => {
        console.log(data);
        // this.response = data;
        loading.dismiss();
        this.listTeamInvites();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }
}
