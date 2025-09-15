import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

interface GamePreferencesForm {
  username: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number>;
  favoriteGame: FormControl<string>;
  agreeTerms: FormControl<boolean>;
}

@Component({
  selector: 'app-form',
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
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  fb = inject(NonNullableFormBuilder)

  // Typed Forms
  public form: FormGroup<GamePreferencesForm> = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    age: this.fb.control(18, [Validators.required, Validators.min(18)]),
    favoriteGame: this.fb.control('', Validators.required),
    agreeTerms: this.fb.control(false, Validators.requiredTrue)
  });



  onSubmit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value, this.form.controls);
    } else {
      console.log('Form is invalid');
    }
  }

}
