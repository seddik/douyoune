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

  constructor(private router: Router) { }

  viewLedger(): void {
    if (this.enteredCode && this.enteredCode.trim()) {
      //console.log('Navigating to ledger with code:', this.enteredCode);
      this.router.navigate(['/guest-dashboard'], { queryParams: { code: this.enteredCode } });
    } else {
      alert('Please enter a code');
    }
  }


}
