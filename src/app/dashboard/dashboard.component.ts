import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDebtDialogComponent } from '../add-debt-dialog/add-debt-dialog.component';
import { inject } from '@angular/core';
import { DebtsService } from '../services/debts.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit {

  private debtsService = inject(DebtsService);
  //TODO: Remove the cdr
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.debtsService.getDebtsList().subscribe({
      next: (resp) => {
        this.debts = resp;
        //TODO: Remove the cdr
        this.cdr.detectChanges();
      },
      error: (err) => {

      }
    });

  }

  debts: any[] = [];


  constructor(private dialog: MatDialog, private router: Router) { }

  get totalAmount(): number {
    return this.debts.reduce((total, debt) => total + (debt.amount * 1), 0);
  }

  openAddDebtDialog(): void {
    const dialogRef = this.dialog.open(AddDebtDialogComponent, {
      width: '350px',
      panelClass: 'add-debt-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.debtsService.addDebt(result).subscribe((resp) => {
          if (resp.success) {
            this.debts.push(result);
            dialogRef.close();
            // TODO : Remove CDR
            this.cdr.detectChanges();
          }
          else {
            alert('failed to add debt');
          }
        });
      }
    });
  }


  openLegacySettings(): void {
    this.router.navigate(['/legacy-settings']);
  }

  viewEvidence(debt: any): void {
    // Will open evidence dialog/view later
  }

  formatAmount(amount: number): string {
    return 'DA ' + amount.toLocaleString();
  }

}
