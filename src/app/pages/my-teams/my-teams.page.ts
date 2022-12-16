import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTeamsService } from '../../services/my-teams.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CreateTeamPage } from '../../modals/create-team/create-team.page';
import { TeamListPage } from 'src/app/modals/team-list/team-list.page';
import { MembersListPage } from 'src/app/modals/members-list/members-list.page';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.page.html',
  styleUrls: ['./my-teams.page.scss'],
})
export class MyTeamsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;

  constructor(
    private myTeamsService: MyTeamsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.listMyTeams();
  }

  async viewTeamList(team_id, team_name) {
    const modal = await this.modalCtrl.create({
      component: MembersListPage,
      componentProps: { team_id: team_id, team_name: team_name },
    });
    modal.present();
    // modal.componentInstance.user = this.response;
    const { data, role } = await modal.onWillDismiss();
  }

  async listMyTeams() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.myTeamsService.listMyTeams().subscribe(
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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateTeamPage,
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listMyTeams();
    });
  }
}
