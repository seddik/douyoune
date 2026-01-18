import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { DebtsService } from '../services/debts.service';

@Component({
  selector: 'app-legacy-settings',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './legacy-settings.component.html',
  styleUrl: './legacy-settings.component.scss'
})
export class LegacySettingsComponent {

  legacyCode = localStorage.getItem('lcode') || '';

  constructor(private router: Router, private clipboard: Clipboard, private debtsService: DebtsService) { }

  goBack(): void {
    this.router.navigate(['/']);
  }

  copyCode(): void {
    this.clipboard.copy(this.legacyCode.replace(/ /g, ''));
    // Could show a snackbar here
  }


  onLogout(): void {
    this.debtsService.logout().subscribe({
      next: (resp: any) => {

        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('token');
          localStorage.removeItem('lcode');

        }
        this.router.navigate(['/login']);
      },
      error: (err: any) => {

      }
    });
  }
}
