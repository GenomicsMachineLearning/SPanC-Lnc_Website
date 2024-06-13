import { Component } from '@angular/core';
import { Router} from '@angular/router';
import{UserMenu} from '../../../../interFaces/UserManu'
@Component({
  selector: 'ngx-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent  {
 public UserMenu:UserMenu[];
  constructor(private route:Router) {
    this.UserMenu=[
      {
          title: 'About',
          icon: 'home-outline',
          link: '/pages/about',
          home: true,
      },
      {
          title: 'Browse',
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
        title: 'Single cell RNA-Seq',
        icon: 'home-outline',
        link: '/pages/singlecell',
        home: false,
    },



    ]
    if(this.UserMenu.length){
      var inde:number=this.UserMenu.findIndex((menu:any)=>menu.home===true);
      if(inde!=-1){
       var link:any= this.UserMenu[this.UserMenu.findIndex((menu:any)=>menu.home===true)];
        this.route.navigate([link['link']])

      }
    }
   }
  
  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0px";
  }

}
