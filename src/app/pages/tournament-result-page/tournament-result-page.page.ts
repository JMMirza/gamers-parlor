import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { PlayerTournamentsService } from 'src/app/services/player-tournaments.service';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Crop } from '@ionic-native/crop/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { MatchResultsService } from 'src/app/services/match-results.service';

@Component({
  selector: 'app-tournament-result-page',
  templateUrl: './tournament-result-page.page.html',
  styleUrls: ['./tournament-result-page.page.scss'],
})
export class TournamentResultPagePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;
  segment = 'PENDING';

  filters = {
    matchStatus: 'PENDING',
    type: 'requests',
  };

  constructor(
    private loadingCtrl: LoadingController,
    private playerTournamentServe: PlayerTournamentsService,
    private matchResultService: MatchResultsService,
    private toastService: ToastService,
    private crop: Crop
  ) {}

  ngOnInit() {
    this.listMyMatches(this.filters);
  }

  async listMyMatches(params?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.playerTournamentServe.listMyMatches(params).subscribe(
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

  // async loadMore(event) {
  //   this.pageNo++;
  //   await this.wagerService.listWagers({ page_no: this.pageNo }).subscribe(
  //     (data: any) => {
  //       console.log(data);

  //       for (var item of data.wagers) {
  //         this.response.push(item);
  //       }

  //       event.target.complete();
  //     },
  //     (error) => {
  //       console.log(error);
  //       event.target.complete();
  //     }
  //   );
  // }

  async segmentChanged(ev) {
    console.log(ev.detail.value);

    this.filters.matchStatus = ev.detail.value;
    this.segment = ev.detail.value;
    await this.listMyMatches(this.filters);
  }

  async listMatches(matchStatus) {
    console.log(matchStatus);
    this.filters.matchStatus = matchStatus;
    await this.listMyMatches(this.filters);
  }

  async getPhoto(tournament_level_id, winner_team_id) {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 50,
        width: 400,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });

      console.log(profilePicture.path);

      // this.formData.team_logo =
      //   'data:image/jpeg;base64,' + profilePicture.base64String;

      await this.crop.crop(profilePicture.path).then(
        (res) => {
          Filesystem.readFile({
            path: res,
          }).then(async (file) => {
            console.log(file.data);
            await this.matchResultService
              .uploadMatchResult({
                winning_proof: 'data:image/jpeg;base64,' + file.data,
                tournament_level_id: tournament_level_id,
                winner_team_id: winner_team_id,
              })
              .subscribe(
                (data: any) => {
                  console.log(data);
                  this.response = data;
                  // this.authService.setUserData(this.response);
                },
                (error) => {
                  console.log(error);
                }
              );
            // this.formData.team_logo = 'data:image/jpeg;base64,' + file.data;
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
