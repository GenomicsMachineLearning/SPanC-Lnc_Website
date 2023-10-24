import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import{UserMenu} from '../../../../interFaces/UserManu'
@Component({
  selector: 'ngx-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
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
          title: 'Gene Explorer',
          icon: 'home-outline',
          link: '/pages/geneexplorer',
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
  ngOnInit(): void {
  }
  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0px";
  }

}
