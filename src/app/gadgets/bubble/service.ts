/**
 * Created by jayhamilton on 6/24/17.
 */

import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";

@Injectable()
export class BubbleService {

    constructor(private _http: HttpClient) {
    }

    getMockData() {
        return this._http.get('chart-mock-bubble-model')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
