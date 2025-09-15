import { Component, inject } from '@angular/core';
import { LoginComponentComponent } from "./login-component/login-component.component";
import { UserProfileComponentComponent } from "./user-profile-component/user-profile-component.component";
import { UserService } from './user.service';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [LoginComponentComponent, UserProfileComponentComponent, MatButton],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  public isHide = true

}
