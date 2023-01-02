import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { RankingTeamMatchesListPage } from 'src/app/modals/ranking-team-matches-list/ranking-team-matches-list.page';
import { MyTeamsService } from 'src/app/services/my-teams.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  response: any;

  constructor(
    private teamService: MyTeamsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.listTeams();
  }

  async listTeams(params?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.teamService.listLadderTeam().subscribe(
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

  async openModal(team_id) {
    const modal = await this.modalCtrl.create({
      component: RankingTeamMatchesListPage,
      componentProps: { team_id: team_id },
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listTeams();
    });
  }
}
