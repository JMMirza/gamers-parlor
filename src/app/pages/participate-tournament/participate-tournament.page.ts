import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participate-tournament',
  templateUrl: './participate-tournament.page.html',
  styleUrls: ['./participate-tournament.page.scss'],
})
export class ParticipateTournamentPage implements OnInit {
  segment = 'createTeams';
  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }
}
