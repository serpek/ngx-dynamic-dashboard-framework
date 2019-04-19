import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Board, IBoard} from '@app/models/Board';
import {Logger} from '@app/core';
import {OperationTypes} from '@app/models/operations.enum';

const log = new Logger('ConfigurationService');

@Injectable()
export class ConfigurationService {
    model: any; // todo review this object closely
    currentModel: any; // this object helps with updates to property page values
    demo = true;
    env: any;

    remoteConfigurationRepository = '/boards';

    constructor(private _http: HttpClient) {
        this.env = environment;
    }

    public getBoardById(id: number): Observable<IBoard> {
        log.debug('getBoardById', id);
        return this._http.get<IBoard>(`${this.remoteConfigurationRepository}/${id}`);
    }

    public getBoards(): Observable<IBoard[]> {
        log.debug('getBoards');
        return this._http.get<IBoard[]>(`${this.remoteConfigurationRepository}`);
    }

    public saveBoard(board: IBoard, operation: OperationTypes) {
        log.debug('saveBoard');
        this.model = board;
        if (Object.keys(board).length === 0 && board.constructor === Object) {
            return EMPTY;
        }

        delete board._id;
        if (operation === OperationTypes.InitNewBoard) {
            return this._http.post(`${this.remoteConfigurationRepository}`, JSON.stringify(board));
        } else {
            return this._http.put(`${this.remoteConfigurationRepository}`, JSON.stringify(board));
        }
    }

    public deleteBoard(board: IBoard) {
        log.debug('deleteBoard');
        return this._http.delete(`${this.remoteConfigurationRepository}/${board.id}`, {
            observe: 'body'
        });
    }

    public getDefaultBoard(): Observable<IBoard> {
        log.debug('getDefaultBoard');
        return new Observable(observer => {
            observer.next(new Board());
            return () => {
            };
        });
    }

    public getBoardByTitle(title: string) {
        if (this.demo) {
            return new Observable(observer => {
                const board_collection = JSON.parse(localStorage.getItem('board'));

                let data = '';
                board_collection['board'].forEach((boardModel: any) => {
                    if (boardModel.title === title) {
                        data = boardModel;
                    }
                });
                observer.next(data);
                return () => {
                };
            });
        } else {
            return this._http.get(this.remoteConfigurationRepository + '/' + name);
        }
    }

    /*
     when a gadget instance's property page is updated and saved, the change gets communicated to all
     gadgets. The gadget instance id that caused the change will update their current instance. todo - this might be able to be
     improved. For now the utility of this approach allows the configuration service to capture the property page change in a way
     that allows us to update the persisted board model.
     */
    notifyGadgetOnPropertyChange(gadgetConfig: string, instanceId: number) {
        this.savePropertyPageConfigurationToStore(gadgetConfig, instanceId);
    }


    setCurrentModel(_currentModel: any) {
        this.currentModel = _currentModel;
    }

    savePropertyPageConfigurationToStore(gadgetConfig: string, instanceId: number) {
        this.currentModel.rows.forEach((row: any) => {
            row.columns.forEach((column: any) => {
                if (column.gadgets) {
                    column.gadgets.forEach((gadget: any) => {
                        this.updateProperties(gadgetConfig, gadget, instanceId);
                    });
                }
            });
        });

        this.saveBoard(this.currentModel, OperationTypes.GadgetUpdate).subscribe((result: any) => {
                /**
                 * todo - create popup/toast to show configuration saved message
                 */
                console.debug('The following configuration model was saved!');
            },
            error => console.error('Error' + error),
            () => console.debug('Saving configuration to store!'));
    }

    updateProperties(updatedProperties: any, gadget: any, instanceId: number) {
        const updatedPropsObject = JSON.parse(updatedProperties);
        if (gadget.instanceId === instanceId) {
            gadget.config.propertyPages.forEach(function (propertyPage: any) {
                for (let x = 0; x < propertyPage.properties.length; x++) {
                    for (const prop in updatedPropsObject) {
                        if (updatedPropsObject.hasOwnProperty(prop)) {
                            if (prop === propertyPage.properties[x].key) {
                                propertyPage.properties[x].value = updatedPropsObject[prop];
                            }
                        }
                    }
                }
            });
        }
    }
}
