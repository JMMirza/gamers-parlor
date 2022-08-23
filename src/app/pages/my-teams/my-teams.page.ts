import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTeamsService } from '../../services/my-teams.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

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
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.listMyTeams();
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
}
