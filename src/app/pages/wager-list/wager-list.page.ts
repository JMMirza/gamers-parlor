import { Component, OnInit, ViewChild } from '@angular/core';
import { WagersService } from '../../services/wagers.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-wager-list',
  templateUrl: './wager-list.page.html',
  styleUrls: ['./wager-list.page.scss'],
})
export class WagerListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;

  constructor(
    private wagerService: WagersService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.listWagers();
  }

  async listWagers() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.wagerService.listWagers().subscribe(
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
