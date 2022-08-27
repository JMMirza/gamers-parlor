import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-vip-tournament-card',
  templateUrl: './vip-tournament-card.component.html',
  styleUrls: ['./vip-tournament-card.component.scss'],
})
export class VipTournamentCardComponent implements OnInit {
  @Input('game') gameData: any;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    console.log(this.gameData);
  }

  showGameRules(game) {
    // console.log(game);
    this.toastService.presentAlert(game.terms_and_condition);
  }
}
