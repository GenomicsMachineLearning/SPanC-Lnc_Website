import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserMenu} from '../../../../interFaces/UserManu'

@Component({
  selector: 'ngx-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
  public UserMenu: UserMenu[];

  constructor(private router: Router) {
    this.UserMenu = [
      {
        title: 'About',
        icon: 'home-outline',
        link: '/pages/about',
        home: true,
      },
      {
        title: 'Genome Browser',
        icon: 'home-outline',
        link: '/pages/ucscgenomebrowser',
        home: false,
      },
      {
        title: 'Table Browser',
        icon: 'home-outline',
        link: '/pages/browse',
        home: false,
      },
      {
        title: 'Visualization',
        icon: 'home-outline',
        link: '/pages/geneexplorer',
        home: false,
      },
      {
        title: 'Spatial Long Read',
        icon: 'home-outline',
        link: '/pages/spatialongread',
        home: false,
      },
      {
        title: 'scRNA-seq',
        icon: 'home-outline',
        link: '/pages/singlecell',
        home: false,
      },
    ]
    if (this.router.url === '/pages' || this.router.url === '/pages/') {
      const homeMenuItem = this.UserMenu.find(menu => menu.home === true);
      if (homeMenuItem) {
        this.router.navigate([homeMenuItem.link]);
      }
    }
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
  }

}
