import { Component, OnInit, ViewChild } from '@angular/core';
import { WagersService } from '../../services/wagers.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { ModalController } from '@ionic/angular';
import { CreateWagersPage } from '../../modals/create-wagers/create-wagers.page';
import { WagerPostParticipatePage } from 'src/app/modals/wager-post-participate/wager-post-participate.page';

@Component({
  selector: 'app-wager-list',
  templateUrl: './wager-list.page.html',
  styleUrls: ['./wager-list.page.scss'],
})
export class WagerListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;
  platforms: any;
  // segment = 'requests';

  filters = {
    platform_id: '',
    type: 'requests',
  };

  constructor(
    private wagerService: WagersService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.listWagers();
  }

  async listWagers(params?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.wagerService.listWagers(params).subscribe(
      (data: any) => {
        console.log(data);
        this.response = data.wagers;
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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateWagersPage,
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listWagers();
    });
  }

  async wagerPostRequest() {
    const modal = await this.modalCtrl.create({
      component: WagerPostParticipatePage,
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listWagers();
    });
  }

  async loadMore(event) {
    this.pageNo++;
    await this.wagerService.listWagers({ page_no: this.pageNo }).subscribe(
      (data: any) => {
        console.log(data);

        for (var item of data.wagers) {
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
    await this.wagerService.listWagers({ page_no: this.pageNo }).subscribe(
      (data: any) => {
        console.log(data);
        this.response = data.wagers;
        event.target.complete();
      },
      (error) => {
        console.log(error);
        event.target.complete();
      }
    );
  }

  async segmentChanged(ev) {
    // this.filters.type = ev.detail.value;
    await this.listWagers(this.filters);
  }

  async onFilter(platform) {
    this.filters.platform_id = platform;
    await this.listWagers(this.filters);
  }

  async listMatches(platform?) {
    this.filters.type = platform;
    await this.listWagers(this.filters);
  }
}
