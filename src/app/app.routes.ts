import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LegacySettingsComponent } from './legacy-settings/legacy-settings.component';
import { GuardianPortalComponent } from './guardian-portal/guardian-portal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'legacy-settings', component: LegacySettingsComponent, canActivate: [authGuard] },
  { path: 'guardian', component: GuardianPortalComponent },
  { path: '**', redirectTo: '' }
];
