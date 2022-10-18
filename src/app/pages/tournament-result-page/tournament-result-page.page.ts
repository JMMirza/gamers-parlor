import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tournament-result-page',
  templateUrl: './tournament-result-page.page.html',
  styleUrls: ['./tournament-result-page.page.scss'],
})
export class TournamentResultPagePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;
  platforms: any;
  wagerPostRequestList: any;
  segment = 'wager_matches';

  filters = {
    matchStatus: '',
    type: 'requests',
  };

  constructor(
    private loadingCtrl: LoadingController,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  async loadMore(event) {
    this.pageNo++;
    // await this.wagerService.listWagers({ page_no: this.pageNo }).subscribe(
    //   (data: any) => {
    //     console.log(data);

    //     for (var item of data.wagers) {
    //       this.response.push(item);
    //     }

    //     event.target.complete();
    //   },
    //   (error) => {
    //     console.log(error);
    //     event.target.complete();
    //   }
    // );
  }

  async segmentChanged(ev) {
    console.log(ev.detail.value);

    this.filters.matchStatus = ev.detail.value;
    this.segment = ev.detail.value;
    // await this.listWagers(this.filters);
  }

  async listMatches(matchStatus) {
    console.log(matchStatus);
    this.filters.matchStatus = matchStatus;
    // await this.listWagers(this.filters);
  }
}
