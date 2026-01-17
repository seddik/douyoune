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
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  hidePassword = true;

  constructor(private router: Router, private debtsService: DebtsService) { }

  isLoading = false;

  onRegister(): void {
    this.isLoading = true;
    this.debtsService.register(this.name, this.email, this.password).subscribe({
      next: (resp: any) => {
        this.isLoading = false;

        if (resp.success) {
          this.router.navigate(['/login']);
        }
      },
      error: (err: any) => {
        this.isLoading = false;

      }
    });
  }


  get formValid(): boolean {
    return this.name.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '';
  }
}
