import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';



export const guestGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const lcode = localStorage.getItem('lcode');

    if (lcode) {
        return true;
    }
    router.navigate(['/guardian']);
    return false;
};