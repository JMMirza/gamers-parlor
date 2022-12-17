import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { MyTeamsService } from 'src/app/services/my-teams.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.page.html',
  styleUrls: ['./members-list.page.scss'],
})
export class MembersListPage implements OnInit {
  @Input() team_id: any;
  @Input() team_name: any;
  team: any;

  constructor(
    private myTeamsService: MyTeamsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log(this.team_id);
    this.viewTeamList(this.team_id);
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  async viewTeamList(team_id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });
    await this.myTeamsService.listTeamMembers({ team_id: team_id }).subscribe(
      (data: any) => {
        console.log(data);
        this.team = data;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }
}
