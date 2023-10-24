import { Component, OnInit } from '@angular/core';
import Editor from '../../../../ckeditor5-custom-build/build/ckeditor';
@Component({
  selector: 'ngx-about-manipulation',
  templateUrl: './about-manipulation.component.html',
  styleUrls: ['./about-manipulation.component.scss']
})
export class AboutManipulationComponent implements OnInit {
  
  public Editor:any = Editor;
  constructor() { }

  ngOnInit(): void {
  }

}
