import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerTournamentsService } from 'src/app/services/player-tournaments.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { TeamListPage } from 'src/app/modals/team-list/team-list.page';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-my-tournaments',
  templateUrl: './my-tournaments.page.html',
  styleUrls: ['./my-tournaments.page.scss'],
})
export class MyTournamentsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any = [];
  platforms: any;
  tournament_teams: any;

  constructor(
    private playerTournamentsService: PlayerTournamentsService,
    private tournamnentService: TournamentService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.listMyTournament();
  }

  async listMyTournament(params?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.playerTournamentsService.listMyTournaments(params).subscribe(
      (data: any) => {
        console.log(data);
        this.response = data.tournaments;
        this.platforms = data.platforms;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  showGameRules(game) {
    // console.log(game);
    this.toastService.presentAlert(game.terms_and_condition);
  }

  platformFilter(e) {
    console.log('platform id', e.detail.value);

    this.listMyTournament({
      pageNo: this.pageNo,
      platform_id: e.detail.value,
    });
  }

  async viewTeamList(team) {
    console.log(team);

    const modal = await this.modalCtrl.create({
      component: TeamListPage,
      componentProps: { team: team },
    });
    modal.present();
    // modal.componentInstance.user = this.response;
    const { data, role } = await modal.onWillDismiss();
  }
}
