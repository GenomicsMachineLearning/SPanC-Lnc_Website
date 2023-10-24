import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../data/users';

@Injectable()
export class UserService  {

  private time: Date = new Date;

  private users = {
    nick: { name: 'Prakrithi', picture: 'assets/images/Prakrithi.jpg' },
  };
  getUsers(): Observable<any> {
    return observableOf(this.users);
  }
}
