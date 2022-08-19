import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.page.html',
  styleUrls: ['./tournaments-list.page.scss'],
})
export class TournamentsListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pageNo = 1;
  response: any;
  constructor(
    private tournamentService: TournamentService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.listTournaments();
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

  async doRefresh(event) {
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
}
