import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { AddDebtDialogComponent } from "../add-debt-dialog/add-debt-dialog.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { DebtsService } from "../services/debts.service";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";


@Component({
    selector: 'app-debt-details',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
    templateUrl: './debt-details.component.html',
    styleUrl: './debt-details.component.scss'
})
export class DebtDetails {
    private debtsService = inject(DebtsService);
    // TODO: Remove cdr
    private cdr = inject(ChangeDetectorRef);

    isGuest = false;

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

        this.isGuest = this.debtsService.isguest();
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

    viewEvidence(debt: any): void {
        // Will open evidence dialog/view later
    }

    formatAmount(amount: number): string {
        return 'DA ' + amount.toLocaleString();
    }


}

