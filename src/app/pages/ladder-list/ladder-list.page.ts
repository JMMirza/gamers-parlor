import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CreateLaddersPage } from 'src/app/modals/create-ladders/create-ladders.page';
import { LadderPostParticipatePage } from 'src/app/modals/ladder-post-participate/ladder-post-participate.page';
import { LadderRequestPage } from 'src/app/modals/ladder-request/ladder-request.page';
import { LadderService } from 'src/app/services/ladder.service';
import { MyTeamsService } from 'src/app/services/my-teams.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ladder-list',
  templateUrl: './ladder-list.page.html',
  styleUrls: ['./ladder-list.page.scss'],
})
export class LadderListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;
  platforms: any;
  ladderPostRequestList: any;
  segment = 'ladder_matches';

  filters = {
    matchCategory: '',
    type: 'requests',
  };
  constructor(
    private ladderService: LadderService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async listLadders(params?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.ladderService.listLadders(params).subscribe(
      (data: any) => {
        console.log(data);
        this.response = data.ladders;
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
      component: CreateLaddersPage,
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listLadders();
    });
  }

  async ladderPostRequest(id) {
    const modal = await this.modalCtrl.create({
      component: LadderPostParticipatePage,
      componentProps: { ladderPostId: id },
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listLadders();
    });
  }

  async wagerPostListRequest(id) {
    await this.ladderService.listLadderRequest({ wager_post_id: id }).subscribe(
      async (data: any) => {
        console.log(data);
        this.ladderPostRequestList = data;
        // this.response = data.wagers;
        const modal = await this.modalCtrl.create({
          component: LadderRequestPage,
          componentProps: { ladderPostRequest: this.ladderPostRequestList },
        });
        modal.present();
        await modal.onWillDismiss().then((data) => {
          console.log(data);
          this.listLadders();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async loadMore(event) {
    this.pageNo++;
    await this.ladderService.listLadders({ page_no: this.pageNo }).subscribe(
      (data: any) => {
        console.log(data);

        for (var item of data.ladders) {
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
    await this.ladderService.listLadders({ page_no: this.pageNo }).subscribe(
      (data: any) => {
        console.log(data);
        this.response = data.ladders;
        event.target.complete();
      },
      (error) => {
        console.log(error);
        event.target.complete();
      }
    );
  }

  async segmentChanged(ev) {
    console.log(ev.detail.value);

    this.filters.matchCategory = ev.detail.value;
    this.segment = ev.detail.value;
    await this.listLadders(this.filters);
  }

  async listMatches(matchCategory) {
    console.log(matchCategory);
    this.filters.matchCategory = matchCategory;
    // await this.listWagers(this.filters);
  }
}
