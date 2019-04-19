import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RuntimeService} from '../services/runtime.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AboutService {
    constructor(private _http: HttpClient) {
    }

    getAPIVersion() {
        return this._http.get(`/version-model`)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
