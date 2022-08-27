import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { ToastService } from '../../services/toast.service';

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
  response_vip: any;
  constructor(
    private tournamentService: TournamentService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.listTournaments();
    this.listVipTournaments();
  }

  async listTournaments() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.tournamentService
      .listTournament({ pageNo: this.pageNo })
      .subscribe(
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
          console.log(data);

          for (var item of data) {
            this.response.push(item);
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
          this.response = data;
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
}
