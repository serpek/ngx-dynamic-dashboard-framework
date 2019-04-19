import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {RuntimeService} from '@app/services/runtime.service';

@Injectable()
export class CPUService {
    constructor(private _http: HttpClient) {
    }

    getMockData() {
        return this._http.get('/cpu-model')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
