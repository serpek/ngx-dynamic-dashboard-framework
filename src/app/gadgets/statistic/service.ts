import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class StatisticService {
    constructor(private _http: HttpClient) {
    }

    get(resourceType: any) {
        return this._http.get('stat-' + resourceType + '-model')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
