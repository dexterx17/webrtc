import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'arsi-contactmanager-app',
  template: `
    <arsi-sidenav></arsi-sidenav>
  `,
  styles: []
})
export class ContactmanagerAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('drone',sanitizer.bypassSecurityTrustResourceUrl('assets/drone.svg'));
    iconRegistry.addSvgIcon('control',sanitizer.bypassSecurityTrustResourceUrl('assets/remote-control.svg'));
  	/*iconRegistry.addSvgIconSet(
  		sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg')
    );*/
  }

  ngOnInit() {
  }

}
