import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-user-profile-component',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-profile-component.component.html',
  styleUrl: './user-profile-component.component.scss'
})
export class UserProfileComponentComponent implements OnInit {
  public userService: UserService = inject(UserService)

  // BehavierSubject
  public userName: string | null = null

  // Subject
  public lastEvent: string | null = null;

  // Signal()
  public userNameSignal = this.userService.user

  ngOnInit(): void {
    this.userService.currentUser$.pipe().subscribe(name => this.userName = name)
    this.userService.events$.pipe().subscribe(event => this.lastEvent = event)
  }
}
