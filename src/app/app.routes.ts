import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LegacySettingsComponent } from './legacy-settings/legacy-settings.component';
import { GuardianPortalComponent } from './guardian-portal/guardian-portal.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'legacy-settings', component: LegacySettingsComponent },
  { path: 'guardian', component: GuardianPortalComponent },
  { path: '**', redirectTo: '' }
];
