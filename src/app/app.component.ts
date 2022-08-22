import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    // { title: 'signup', url: 'signup', icon: 'home' },
    { title: 'My Tournaments', url: 'my-tournaments', icon: 'trophy' },
    { title: 'My Teams', url: 'my-teams', icon: 'people' },
  ];

  constructor() {}
}
