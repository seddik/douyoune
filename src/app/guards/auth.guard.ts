import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const lcode = localStorage.getItem('lcode');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }


  if (!lcode) {
    router.navigate(['/guardian']);
    return false;
  }


  return true;

};
