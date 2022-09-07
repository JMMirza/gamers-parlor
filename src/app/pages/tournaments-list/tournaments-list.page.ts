import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { CreateTournamentPage } from '../../modals/create-tournament/create-tournament.page';
import { CreateTeamPage } from '../../modals/create-team/create-team.page';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.page.html',
  styleUrls: ['./tournaments-list.page.scss'],
})
export class TournamentsListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('swiper') swiper: SwiperComponent;

  pageNo = 1;
  response: any;
  platforms: any;
  response_vip: any;

  constructor(
    private tournamentService: TournamentService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.listTournaments({ pageNo: this.pageNo });
    this.listVipTournaments();
  }

  platformFilter(e) {
    console.log('platform id', e.detail.value);

    this.listTournaments({
      pageNo: this.pageNo,
      platform_id: e.detail.value,
    });
  }

  async listTournaments(params?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.tournamentService.listTournament(params).subscribe(
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

  async listVipTournaments() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.tournamentService
      .listVipTournament({ pageNo: this.pageNo })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.response_vip = data;
          loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

  async loadMore(event) {
    this.pageNo++;
    await this.tournamentService
      .listTournament({ page_no: this.pageNo })
      .subscribe(
        (data: any) => {
          console.log(data.tournaments);

          if (data) {
            for (var item of data.tournaments) {
              this.response.push(item);
            }
          }

          event.target.complete();
        },
        (error) => {
          console.log(error);
          event.target.complete();
        }
      );
  }

  public async doRefresh(event) {
    this.pageNo = 1;
    await this.tournamentService
      .listTournament({ page_no: this.pageNo })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.response = data.tournaments;
          event.target.complete();
        },
        (error) => {
          console.log(error);
          event.target.complete();
        }
      );
  }

  showGameRules(game) {
    // console.log(game);
    this.toastService.presentAlert(game.terms_and_condition);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateTournamentPage,
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listTournaments();
    });
  }


  async participateModal() {
    const modal = await this.modalCtrl.create({
      component: CreateTeamPage,
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listTournaments();
    });
  }
}
