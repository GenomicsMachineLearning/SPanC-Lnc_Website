import { Component } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { GlobalService } from '../../service/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl:'./pages.component.html',
})
export class PagesComponent {
  menu = MENU_ITEMS;
 

    
 

  }

