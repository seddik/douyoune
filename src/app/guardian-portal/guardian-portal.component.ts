import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guardian-portal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './guardian-portal.component.html',
  styleUrl: './guardian-portal.component.scss'
})
export class GuardianPortalComponent {
  // Input code from heir
  enteredCode = '';

  constructor(private router: Router) {}

  viewLedger(): void {
    if (this.enteredCode.trim()) {
      // In real app, would validate code with API
      // For now, just navigate to dashboard
      console.log('Accessing ledger with code:', this.enteredCode);
      this.router.navigate(['/']);
    }
  }
}
