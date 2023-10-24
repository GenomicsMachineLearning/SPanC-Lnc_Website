import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public loginFrom:FormGroup;
  constructor(
    private FB:FormBuilder,
    private message:NbToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.preparForm()
  }
  submit(){
   if(this.loginFrom.invalid){
    this.message.show('Info','Please Fill Username And Password')
   }else{
    this.router.navigate(['/admin']);

   }
  }
preparForm():void{
  this.loginFrom = this.FB.group({
    username: [null,Validators.required],
    password: [null,Validators.required],
  });
}

}
