import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.page.html',
  styleUrls: ['./tournaments-list.page.scss'],
})
export class TournamentsListPage implements OnInit {
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

    await this.tournamentService.listTournament().subscribe(
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
