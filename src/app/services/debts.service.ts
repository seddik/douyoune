import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebtsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:6010/api/debts/list';

  getDebtsList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
