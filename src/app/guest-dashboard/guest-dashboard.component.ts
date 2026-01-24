import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtsService } from '../services/debts.service';

@Component({
    selector: 'app-guest-dashboard',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
    templateUrl: './guest-dashboard.component.html',
    styleUrl: './guest-dashboard.component.scss'
})
export class GuestDashboardComponent implements OnInit {

    private route = inject(ActivatedRoute);
    private debtsService = inject(DebtsService);
    private router = inject(Router);
    //TODO: Remove the cdr
    private cdr = inject(ChangeDetectorRef);

    debts_list: any[] = [];
    isLoading = true;
    errorMessage: string = '';

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (typeof window !== 'undefined' && window.localStorage) {
                var guest_code = localStorage.getItem('gtoken');
                if (guest_code) {
                    this.verifyAndLoadDebts(guest_code);
                } else {
                    this.errorMessage = 'No guest code provided.';
                    this.isLoading = false;
                }
            }
        });
    }

    verifyAndLoadDebts(gcode: string): void {

        this.debtsService.guestDebts(gcode).subscribe({
            next: (response) => {

                if (response.success) {
                    // Map fields based on the user provided screenshot
                    this.debts_list = response.list || [];

                }
                else {
                    this.errorMessage = response.message
                }
                this.isLoading = false;
                //TODO: Remove the cdr
                this.cdr.detectChanges();
            },
            error: (err) => {

                this.errorMessage = 'Invalid code or error fetching records.';
                this.isLoading = false;
                //TODO: Remove the cdr
                this.cdr.detectChanges();
            }
        });
    }

    get totalAmount(): number {
        return this.debts_list.reduce((total, debt) => total + (debt.amount * 1), 0);
    }

    viewEvidence(debt: any): void {
    }

    formatAmount(amount: number): string {
        return 'DA ' + amount.toLocaleString();
    }

    goBack(): void {
        this.router.navigate(['/guardian']);
    }


    debtdetails(debt: any): void {
        this.router.navigate(['/debts-details']);
    }
}
