import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {RuntimeService} from '@app/services/runtime.service';

@Injectable()
export class TrendService {
    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/trend-model')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
