import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-debt-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './add-debt-dialog.component.html',
  styleUrl: './add-debt-dialog.component.scss'
})
export class AddDebtDialogComponent implements OnInit {
  // Form data
  debt: any = {
    name: '',
    amount: null,
    currency: 'DZD',
    type: 'i_owe_them',
    notes: '',
    dueDate: ''
  };

  currencies = ['DZD', 'USD', 'EUR', 'SAR'];

  constructor(private dialogRef: MatDialogRef<AddDebtDialogComponent>) { }

  ngOnInit() {
    //console.log("wink");
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.debt.name && this.debt.amount) {
      this.dialogRef.close(this.debt);
    }
  }
}
