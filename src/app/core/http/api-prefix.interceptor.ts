import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@env/environment';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
    token: string;
    deviceId: string;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem('token');
        this.deviceId = localStorage.getItem('deviceId');
        const updateParams = {};

        if (!/^(http|https):/i.test(request.url)) {
            if (this.token) {
                let headers = new HttpHeaders();
                headers = headers.append('Content-Type', 'application/json');
                headers = headers.append('Authorization', `Bearer ${this.token}`);
                headers = headers.append('deviceId', `${this.deviceId}`);
                updateParams['headers'] = headers;
            }

            updateParams['url'] = environment.apiUrl + request.url + '?' + new Date().getTime();
        }
        return next.handle(request.clone(updateParams));
    }
}
