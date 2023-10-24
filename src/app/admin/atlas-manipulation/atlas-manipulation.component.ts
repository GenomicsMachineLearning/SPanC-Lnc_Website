import { Component, OnInit } from '@angular/core';
import Editor from '../../../../ckeditor5-custom-build/build/ckeditor';

@Component({
  selector: 'ngx-atlas-manipulation',
  templateUrl: './atlas-manipulation.component.html',
  styleUrls: ['./atlas-manipulation.component.scss']
})
export class AtlasManipulationComponent implements OnInit {
  public Editor:any = Editor;


  constructor() { }

  ngOnInit(): void {
  }

}
