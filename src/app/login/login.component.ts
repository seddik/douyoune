import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { DebtsService } from '../services/debts.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  hidePassword = true;

  constructor(private router: Router, private debtsService: DebtsService) { }

  onLogin(): void {
    this.isLoading = true;
    this.debtsService.login(this.username, this.password).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        //console.log('Login success', resp);
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('token', resp.token);
        }
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.isLoading = false;
        // console.error('Login failed', err);
      }
    });


  }
}
