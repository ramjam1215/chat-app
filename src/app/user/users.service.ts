import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

//Subject => like a Read/Write stream
//Subject inherits from Observable and Observer
//BehaviorSubject stores the last value
@Injectable()
export class UsersService {
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [UsersService];
