import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  response: any;
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    // { title: 'signup', url: 'signup', icon: 'home' },
    { title: 'My Tournaments', url: 'my-tournaments', icon: 'trophy' },
    { title: 'My Teams', url: 'my-teams', icon: 'people' },
    { title: 'Logout', url: 'logout', icon: 'log-out-outline' },
  ];
  constructor(
    private router: Router,
    private menu: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userObject();
  }

  async userObject() {
    this.response = await this.authService.getUserObject();
    console.log(this.response);
  }

  async openModal() {
    this.router.navigateByUrl('/home/profile');
    this.menu.close();
  }
}
