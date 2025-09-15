import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SignalsComponent } from './signals/signals.component';
import { SubjectComponent } from './subject/subject.component';

export const routes: Routes = [
    { path: 'form', component: FormComponent },
    { path: 'subject', component: SubjectComponent },
    { path: 'signals', component: SignalsComponent },
    { path: '', redirectTo: '/form', pathMatch: 'full' }
  ];
