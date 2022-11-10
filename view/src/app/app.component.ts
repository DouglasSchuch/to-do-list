import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from './models/User';
import { GeneralService } from './services/general.service';
import { RouteService } from './services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'To-Do List';

  constructor(public general: GeneralService, private routeService: RouteService) {
  }

  ngOnInit(): void {
    const token = this.general.getCookie('TOKEN');
    if (token) {
      this.routeService.getUserBoard().subscribe((user: User | null) => {
        if (user) {
          this.general.user = user;
        } else {
          this.general.removeCookie('TOKEN');
        }
      });
    }
  }
}