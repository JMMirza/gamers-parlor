import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LadderService } from 'src/app/services/ladder.service';

@Component({
  selector: 'app-ranking-team-matches-list',
  templateUrl: './ranking-team-matches-list.page.html',
  styleUrls: ['./ranking-team-matches-list.page.scss'],
})
export class RankingTeamMatchesListPage implements OnInit {
  @Input() team_id: any;
  response: any;
  wins: any;
  losses: any;
  constructor(
    private modalCtrl: ModalController,
    private ladderService: LadderService
  ) {}

  ngOnInit() {
    this.viewTeamList(this.team_id);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  async viewTeamList(team_id) {
    await this.ladderService.listTeamMatches({ team_id: team_id }).subscribe(
      (data: any) => {
        console.log(data);
        this.response = data.ladders_data;
        this.wins = data.count_wins;
        this.losses = data.count_losses;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
