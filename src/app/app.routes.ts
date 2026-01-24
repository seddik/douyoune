import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LegacySettingsComponent } from './legacy-settings/legacy-settings.component';
import { GuardianPortalComponent } from './guardian-portal/guardian-portal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard.component';
import { DebtDetails } from './debt-details/debt-details.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'guest-dashboard', component: GuestDashboardComponent }, //there was here a guestguard
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'legacy-settings', component: LegacySettingsComponent, canActivate: [authGuard] },
  { path: 'debts-details', component: DebtDetails, }, // there was here an authguard
  { path: 'guardian', component: GuardianPortalComponent },
  { path: '**', redirectTo: '' }
];
