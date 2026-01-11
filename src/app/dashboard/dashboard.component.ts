import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDebtDialogComponent } from '../add-debt-dialog/add-debt-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  // Mock data - will be replaced with API later
  ngOnInit() {
    console.log("wink");
  }
  debts: any[] = [
    {
      id: 1,
      creditorName: 'Uncle Ahmed',
      amount: 5000,
      currency: 'DZD',
      dueDate: 'Jan 2026',
      status: 'unpaid',
      type: 'i_owe_them',
      notes: 'Borrowed for car repair. Witness: Ali'
    },
    {
      id: 2,
      creditorName: 'Bank Loan',
      amount: 10000,
      currency: 'DZD',
      dueDate: 'Monthly',
      status: 'unpaid',
      type: 'i_owe_them',
      notes: 'Home loan installment'
    },
    {
      id: 3,
      creditorName: 'Cousin Omar',
      amount: 2000,
      currency: 'DZD',
      dueDate: 'Feb 2026',
      status: 'paid',
      type: 'they_owe_me',
      notes: 'Lent for wedding expenses'
    }
  ];

  constructor(private dialog: MatDialog, private router: Router) { }

  get totalOutstanding(): number {
    return this.debts
      .filter(d => d.status === 'unpaid' && d.type === 'i_owe_them')
      .reduce((sum, d) => sum + d.amount, 0);
  }

  openAddDebtDialog(): void {
    const dialogRef = this.dialog.open(AddDebtDialogComponent, {
      width: '350px',
      panelClass: 'add-debt-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.debts.push({
          id: this.debts.length + 1,
          ...result,
          status: 'unpaid'
        });
      }
    });
  }

  openLegacySettings(): void {
    this.router.navigate(['/legacy-settings']);
  }

  viewEvidence(debt: any): void {
    console.log('Viewing evidence for:', debt);
    // Will open evidence dialog/view later
  }

  formatAmount(amount: number): string {
    return '$ ' + amount.toLocaleString();
  }
}
