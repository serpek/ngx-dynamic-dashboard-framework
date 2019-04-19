/**
 * Created by jayhamilton on 6/24/17.
 */
import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";
@Injectable()
export class StorageService {

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('storage-model')
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
