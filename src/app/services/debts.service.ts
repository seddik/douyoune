import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebtsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:6010/api/debts/list';
  private addDebtUrl = 'http://localhost:6010/api/debts/add';
  private loginUrl = 'http://localhost:6010/api/login';
  private registerUrl = 'http://localhost:6010/api/register';



  getDebtsList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { name, email, password });
  }
  addDebt(debt: any): Observable<any> {
    return this.http.post<any>(this.addDebtUrl, debt);
  }
}
