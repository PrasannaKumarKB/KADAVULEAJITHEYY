import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration/registration.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { StatusComponent } from './status/status.component';
import { InternalRegistrationComponent } from './internalregistration.component';
import { HomeComponent } from './home/home.component';
import { ExternalRegistrationComponent } from './externalregistration.component';
import { FacultyComponent } from './faculty.component';
import { AdminComponent } from './admin.component';
import { UserSelectionComponent } from './selection.component';

export const routes: Routes = [
  { path: '', redirectTo: 'google-signin', pathMatch: 'full' }, // Default to Google Sign-In page
  { path: 'google-signin', component: GoogleSigninComponent },
  { path: 'student', component: HomeComponent }, // Home route
  { path: 'register', component: RegistrationFormComponent },
  { path: 'admin',component:AdminComponent},
  { path: 'status', component: StatusComponent },
  { path: 'user', component: UserSelectionComponent },

  { path: 'internal', component: InternalRegistrationComponent },
  { path: 'external', component: ExternalRegistrationComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: '**', redirectTo: 'google-signin', pathMatch: 'full' }, // Wildcard fallback to Google Sign-In
];

export default routes;
