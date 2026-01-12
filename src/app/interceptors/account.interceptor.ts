import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class AccountInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        var token = "";
        if (typeof window !== 'undefined' && window.localStorage) {
            token = localStorage.getItem('token') || "";
        }
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(cloned);
    }
}

