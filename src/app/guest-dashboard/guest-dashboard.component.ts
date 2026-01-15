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
    user_id: number | null = null;
    isLoading = true;
    errorMessage: string = '';

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const gcode = params['code'];
            if (gcode) {
                this.verifyAndLoadDebts(gcode);
            } else {
                this.errorMessage = 'No guest code provided.';
                this.isLoading = false;
            }
        });
    }

    verifyAndLoadDebts(gcode: string): void {
        // console.log('Verifying code:', gcode);
        this.debtsService.guestDebts(gcode).subscribe({
            next: (response) => {
                // console.log('API Response:', response);
                if (response) {
                    // Map fields based on the user provided screenshot
                    this.debts_list = response.debts_list || [];
                    this.user_id = response.user_id;
                }
                this.isLoading = false;
                //TODO: Remove the cdr
                this.cdr.detectChanges();
            },
            error: (err) => {
                //  console.error('Error fetching debts', err);
                this.errorMessage = 'Invalid code or error fetching records.';
                this.isLoading = false;
                //TODO: Remove the cdr
                this.cdr.detectChanges();
            }
        });
    }

    get totalAmount(): number {
        return this.debts_list.reduce((total, debt) => total + (Number(debt.amount) || 0), 0);
    }

    viewEvidence(debt: any): void {
        // console.log('Viewing evidence for:', debt);
        if (debt.notes) {
            alert('Note: ' + debt.notes);
        }
    }

    formatAmount(amount: number): string {
        return 'DA ' + amount.toLocaleString();
    }

    goBack(): void {
        this.router.navigate(['/guardian']);
    }
}
