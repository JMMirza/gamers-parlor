import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerTournamentsService } from 'src/app/services/player-tournaments.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-my-tournaments',
  templateUrl: './my-tournaments.page.html',
  styleUrls: ['./my-tournaments.page.scss'],
})
export class MyTournamentsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;

  constructor(
    private playerTournamentsService: PlayerTournamentsService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.listMyTournament();
  }

  async listMyTournament() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.playerTournamentsService.listMyTournaments().subscribe(
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
}
