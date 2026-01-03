import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-legacy-settings',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './legacy-settings.component.html',
  styleUrl: './legacy-settings.component.scss'
})
export class LegacySettingsComponent {
  // Mock legacy code
  legacyCode = 'XYZ - 778 - 992';

  constructor(private router: Router, private clipboard: Clipboard) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  copyCode(): void {
    this.clipboard.copy(this.legacyCode.replace(/ /g, ''));
    // Could show a snackbar here
  }

  regenerateCode(): void {
    // Generate a new random code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 3; i++) {
      if (i > 0) code += ' - ';
      for (let j = 0; j < 3; j++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    this.legacyCode = code;
  }
}
