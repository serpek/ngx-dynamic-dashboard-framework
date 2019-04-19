import {Component, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {GadgetInstanceService} from './grid.service';
import {ConfigurationService} from '../services/configuration.service';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import {MenuEventService} from '@app/shell/menu/menu-service';
import {GadgetConfigModel} from '@app/gadgets/_common/gadget-config-model';
import {ToastService} from '@app/shared/toast/toast.service';
import {AddGadgetService} from '@app/shared/add-gadget/service';
import {IBoard, IColumn, IGadget} from '@app/models/Board';
import {Logger} from '@app/core';
import {OperationTypes} from '@app/models/operations.enum';

const log = new Logger('GridComponent');

@Component({
    moduleId: module.id,
    selector: 'app-grid-component',
    templateUrl: './grid.html',
    styleUrls: ['./styles-grid.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
    @Output() boardUpdateEvent: EventEmitter<any> = new EventEmitter();

    board: IBoard;

    noGadgets = true;
    dashedStyle: {};

    gadgetLibrary: IGadget[] = [];

    gridInsertionPosition = {
        x: 0,
        y: 0
    };

    options: GridsterConfig;
    dashboard: Array<GridsterItem>;

    static itemChange(item: any, itemComponent: any) {
        console.info('itemChanged', item, itemComponent);
    }

    static itemResize(item: any, itemComponent: any) {
        console.info('itemResized', item, itemComponent);
    }

    constructor(private _gadgetInstanceService: GadgetInstanceService,
                private _configurationService: ConfigurationService,
                private _gadgetLibraryService: AddGadgetService,
                private _toastService: ToastService,
                private _menuEventService: MenuEventService) {
        this.removeOldListeners();
        this.setupEventListeners();
        this.initializeBoard();
        this.getGadgetLibrary();
    }

    removeOldListeners() {
        log.debug('removeOldListeners');
        this._gadgetInstanceService.unSubscribeAll();
        this._menuEventService.unSubscribeAll();
    }

    setupEventListeners() {
        log.debug('setupEventListeners');

        const gadgetRemoveEventSubscriber = this._gadgetInstanceService.listenForInstanceRemovedEventsFromGadgets().subscribe((message: string) => {
            this.saveBoard('Gadget Removed From Board: ' + message, OperationTypes.GadgetRemoved, false);
        });
        const menuEventSubscriber = this._menuEventService.listenForMenuEvents().subscribe((event: IEvent) => {
            log.debug('menuEventSubscriber', event);
            const edata = event['data'];
            switch (event['name']) {
                case 'boardChangeLayoutEvent':
                    this.updateBoardLayout(edata);
                    break;
                case 'boardSelectEvent':
                    this.loadBoard(edata.id);
                    break;
                case 'boardCreateEvent':
                    console.log('boardCreateEvent', edata);
                    this.createBoard(edata);
                    break;
                case 'boardEditEvent':
                    this.editBoard(edata);
                    break;
                case 'boardDeleteEvent':
                    this.deleteBoard(edata);
                    break;
                case 'boardAddGadgetEvent':
                    this.addGadget(edata);
                    break;
            }
        });
        this._gadgetInstanceService.addSubscriber(gadgetRemoveEventSubscriber);
        this._menuEventService.addSubscriber(menuEventSubscriber);
    }

    getGadgetLibrary() {
        log.debug('getGadgetLibrary');
        this._gadgetLibraryService.getGadgetLibrary().subscribe(gadgets => {
            this.gadgetLibrary.length = 0;
            const me = this;
            gadgets.forEach(item => {
                me.gadgetLibrary.push(item);
            });
        });
    }

    getGadgetFromLibrary(gadgetType: string): IGadget {
        log.debug('getGadgetFromLibrary');
        let gadgetObject = null;
        this.gadgetLibrary.forEach(gadget => {
            if (gadgetType.localeCompare(gadget['componentType']) === 0) {
                gadgetObject = gadget;
            }
        });
        return gadgetObject;
    }

    updateGadgetPositionInBoard($event: any, columnNumber: number, rowNumber: number, type: string) {
        log.debug('updateGadgetPositionInBoard');
        let moveComplete = false;

        this.getBoard().rows.forEach(row => {
            let colpos = 0;
            row.columns.forEach(column => {
                let gadgetpos = 0;
                if (column.gadgets) {
                    column.gadgets.forEach(_gadget => {
                        if (_gadget.instanceId === $event.dragData && !moveComplete) {
                            const gadget = column.gadgets.splice(gadgetpos, 1);
                            if (!this.getBoard().rows[rowNumber].columns[columnNumber].gadgets) {
                                this.getBoard().rows[rowNumber].columns[columnNumber].gadgets = [];
                            }
                            this.getBoard().rows[rowNumber].columns[columnNumber].gadgets.push(gadget[0]);
                            this.saveBoard('drag drop operation', OperationTypes.DragDrop, false);
                            moveComplete = true;
                        }
                        gadgetpos++;
                    });
                    colpos++;
                }
            });
        });
    }

    public createBoard(board: IBoard) {
        log.debug('createBoard', board);
        this.loadNewBoard(board);
    }

    public editBoard(board: IBoard) {
        log.debug('editBoard', board, this.getBoard());
    }

    public deleteBoard(board: IBoard) {
        log.debug('deleteBoard');
        this._configurationService.deleteBoard(board).subscribe(data => {
                this.initializeBoard();
            },
            error => console.error('Deletion error', error),
            () => console.debug('Board Deletion: ' + name));
    }

    public addGadget(gadget: IGadget) {
        log.debug('addGadget', gadget);

        const _gadget = Object.assign({}, gadget);

        _gadget.instanceId = new Date().getTime();
        _gadget.config = new GadgetConfigModel(gadget.config);

        this.setGadgetInsertPosition();

        const x = this.gridInsertionPosition.x;
        const y = this.gridInsertionPosition.y;

        if (!this.getBoard().rows[x].columns[y].gadgets) {

            this.getBoard().rows[x].columns[y].gadgets = [];
        }
        this.getBoard().rows[x].columns[y].gadgets.push(_gadget);

        this.saveBoard('Adding Gadget To The Board', OperationTypes.AddingGadget, false);
    }

    public updateBoardLayout(structure: any) {
        log.debug('updateBoardLayout', {structure});
        // console.log('IN UPDATE BOARD LAYOUT');
        // user selected the currently selected layout
        if (structure.id === this.getBoard().layoutId) {
            return;
        }

        // copy the current board's model
        const _board = Object.assign({}, this.getBoard());

        // get just the columns that contain gadgets from all rows
        const originalColumns: any[] = this.readColumnsFromOriginalModel(_board);

        // reset the copied model's rows, which include columns
        _board.rows.length = 0;

        // copy the contents of the requested structure into the temporary model
        // we now have a board model we can populate with the original board's gadgets
        Object.assign(_board.rows, structure.rows);
        _board.structure = structure.structure;
        _board.layoutId = structure.id;

        let originalColumnIndexToStartProcessingFrom = 0;

        /* For each column from the original board, copy its gadgets to the new structure.
         The requested layout may have more or less columns than defined by the original layout. So the fillGridStructure method
         will copy column content into the target. If there are more columns than the target,
         the fillGridStructure will return the count of remaining columns to be processed and then process those.
         */
        while (originalColumnIndexToStartProcessingFrom < originalColumns.length) {
            // tslint:disable-next-line:max-line-length
            originalColumnIndexToStartProcessingFrom = this.fillGridStructure(_board, originalColumns, originalColumnIndexToStartProcessingFrom);
        }

        // This will copy the just processed model and present it to the board
        this.setBoard(_board);

        // clear temporary object
        Object.entries(_board).map(prop => {
            console.log(prop);
        });
        // _board.forEach(board => {
        //     delete board;
        // });

        // persist the board change
        this.saveBoard('Grid Layout Update', OperationTypes.GridLayoutUpdate, false);
    }

    public enableConfigMode() {
        log.debug('enableConfigMode');
        this._gadgetInstanceService.enableConfigureMode();
    }

    public setBoard(board: IBoard) {
        log.debug('setBoard', {board});
        this.board = Object.assign({}, board);
    }

    public getBoard(): IBoard {
        log.debug('getBoard', this.board);
        return this.board;
    }

    ngOnInit() {
        this.options = {
            gridType: GridType.Fit,
            displayGrid: DisplayGrid.OnDragAndResize,
            pushItems: false,
            minCols: 20,
            minRows: 20,
            swap: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true
            }
        };
        this.dashboard = [
            {cols: 2, rows: 1, y: 0, x: 0},
            {cols: 2, rows: 2, y: 0, x: 2},
            {cols: 1, rows: 1, y: 0, x: 4},
            {cols: 3, rows: 2, y: 1, x: 4},
            {cols: 1, rows: 1, y: 4, x: 5},
            {cols: 1, rows: 1, y: 2, x: 1},
            {cols: 2, rows: 2, y: 5, x: 5},
            {cols: 2, rows: 2, y: 3, x: 2},
            {cols: 2, rows: 1, y: 2, x: 2},
            {cols: 1, rows: 1, y: 3, x: 4},
            {cols: 1, rows: 1, y: 0, x: 6}
        ];
    }

    changedOptions() {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    addItem() {
        this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
    }

    private updateGridState() {
        log.debug('updateGridState');
        let gadgetCount = 0;
        if (this.getBoard().rows) {
            this.getBoard().rows.forEach(row => {
                row.columns.forEach(column => {
                    if (column.gadgets) {
                        column.gadgets.forEach(gadget => {
                            gadgetCount++;
                        });
                    }
                });
            });
        }

        this.noGadgets = !gadgetCount;

        this.dashedStyle = {
            'border-style': this.noGadgets ? 'dashed' : 'none',
            'border-width': this.noGadgets ? '2px' : 'none',
            'border-color': this.noGadgets ? 'darkgray' : 'none',
            'padding': this.noGadgets ? '5px' : 'none'
        };
    }

    private readColumnsFromOriginalModel(_model: IBoard): IColumn[] {
        log.debug('readColumnsFromOriginalModel', _model);
        const columns: IColumn[] = [];
        _model.rows.forEach(row => {
            row.columns.forEach(col => {
                columns.push(col);
            });
        });
        return columns;
    }

    private fillGridStructure(destinationModelStructure: IBoard, originalColumns: IColumn[], counter: number): number {
        log.debug('fillGridStructure');

        const me = this;

        destinationModelStructure.rows.forEach(row => {
            row.columns.forEach(destinationColumn => {
                if (!destinationColumn.gadgets) {
                    destinationColumn.gadgets = [];
                }
                if (originalColumns[counter]) {
                    me.copyGadgets(originalColumns[counter], destinationColumn);
                    counter++;
                }
            });
        });

        return counter;
    }

    private copyGadgets(source: IColumn, target: IColumn) {
        log.debug('copyGadgets');
        if (source.gadgets && source.gadgets.length > 0) {
            let w = source.gadgets.shift();
            while (w) {
                target.gadgets.push(w);
                w = source.gadgets.shift();
            }
        }
    }

    private initializeBoard() {
        log.debug('initializeBoard');
        this._configurationService.getBoards().subscribe(board => {
            log.debug('getBoards');
            if (board && board instanceof Array && board.length) {
                const sortedBoard = board.sort((a, b) => a.boardInstanceID - b.boardInstanceID);
                this.loadBoard(sortedBoard[0].id);
            } else {
                this.loadDefaultBoard();
            }
        });
    }

    private loadBoard(boardId: number) {
        log.debug('loadBoard', boardId);
        this._configurationService.getBoardById(boardId).subscribe(board => {
                log.debug('getBoardById', board);
                this.clearGridModelAndGadgetInstanceStructures();
                this.setBoard(board);
                this.updateServicesAndGridWithModel();
                this.boardUpdateEvent.emit(boardId);
            },
            error => {
                console.error(error);
                this.loadDefaultBoard();
            });
    }

    private loadDefaultBoard() {
        log.debug('loadDefaultBoard');
        this.clearGridModelAndGadgetInstanceStructures();
        this._configurationService.getDefaultBoard().subscribe(board => {
            this.setBoard(board);
            this.updateServicesAndGridWithModel();
            this.saveBoard('Initialization of a default board', OperationTypes.InitDefaultBoard, true);
        });
    }

    private loadNewBoard(board: IBoard) {
        log.debug('loadNewBoard', board);
        this.clearGridModelAndGadgetInstanceStructures();
        this.setBoard(board);
        this.updateServicesAndGridWithModel();
        this.saveBoard('Initialization of a new board', OperationTypes.InitNewBoard, true);
    }

    private updateServicesAndGridWithModel() {
        log.debug('updateServicesAndGridWithModel');
        this._gadgetInstanceService.setCurrentModel(this.getBoard());
        this._configurationService.setCurrentModel(this.getBoard());
        this.updateGridState();
    }

    private saveBoard(operationText: string, operation: OperationTypes, alertBoardListenerThatTheMenuShouldBeUpdated: boolean) {
        log.debug('saveBoard', operationText);
        this.updateServicesAndGridWithModel();
        this._configurationService.saveBoard(this.getBoard(), operation).subscribe(result => {
                this._toastService.sendMessage(this.getBoard().title + ' has been updated!', '');
                if (alertBoardListenerThatTheMenuShouldBeUpdated) {
                    this._menuEventService.raiseGridEvent({name: 'boardUpdateEvent', data: this.getBoard().title});
                }
            },
            error => console.error('Error' + error),
            () => console.debug('Saving configuration to store!'));
    }

    private clearGridModelAndGadgetInstanceStructures() {
        log.debug('clearGridModelAndGadgetInstanceStructures');
// clear gadgetInstances
        this._gadgetInstanceService.clearAllInstances();
// clear current model
        for (const prop in this.getBoard()) {
            if (this.board.hasOwnProperty(prop)) {
                delete this.board[prop];
            }
        }
    }

    private setGadgetInsertPosition() {
        log.debug('setGadgetInsertPosition');
        for (let x = 0; x < this.getBoard().rows.length; x++) {
            for (let y = 0; y < this.getBoard().rows[x].columns.length; y++) {
                if (this.getBoard().rows[x].columns[y].gadgets && this.getBoard().rows[x].columns[y].gadgets.length === 0) {
                    this.gridInsertionPosition.x = x;
                    this.gridInsertionPosition.y = y;
                    return;
                }
            }
        }
// we go here because the board is either empty or full
// insert in the top left most cell
        this.gridInsertionPosition.y = 0;

        if (this.noGadgets) {
            // there are no gadgets so insert in top row
            this.gridInsertionPosition.x = 0;
        } else {
            // board is full so insert in the last row
            this.gridInsertionPosition.x = this.getBoard().rows.length - 1;
        }
    }
}
