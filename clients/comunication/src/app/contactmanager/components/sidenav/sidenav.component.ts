import { Component, OnInit, NgZone, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { MatSidenav} from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'arsi-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

	private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;

  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    zone: NgZone,
    private userService: UserService,
    private router: Router) {
  	this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  toggleTheme(){
    this.isDarkTheme = !this.isDarkTheme;
  }
  toggleDir(){
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then(()=>{ this.sidenav.toggle() });
  }
  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();
    this.router.events.subscribe(() => {
      if(this.isScreenSmall())
        this.sidenav.close();
    });
    
  }

  isScreenSmall(): boolean {
  	return this.mediaMatcher.matches;
  }

}
