import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';

interface GamePreferencesForm {
  username: FormControl<string>;
}

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {

  fb = inject(NonNullableFormBuilder)
  
  public userService: UserService = inject(UserService)

  // Typed Forms
  public form: FormGroup<GamePreferencesForm> = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
  });

  sendSubject() {
    this.userService.send('neues-user')
  }

  onSubmit() {
    if (this.form.valid && this.form.value.username) {
      console.log('Form Data:', this.form.value, this.form.controls);
      this.userService.login(this.form.value.username)
    } else {
      console.log('Form is invalid');
    }
  }

}
