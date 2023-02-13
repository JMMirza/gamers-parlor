import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-games-rules',
  templateUrl: './games-rules.page.html',
  styleUrls: ['./games-rules.page.scss'],
})
export class GamesRulesPage implements OnInit {

  public games = [];

  constructor(
    private tournamentService: TournamentService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.listGames();
  }

    async listGames() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.tournamentService.listGames(null).subscribe(
      (data: any) => {
        console.log(data);
        this.games = data;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

}
