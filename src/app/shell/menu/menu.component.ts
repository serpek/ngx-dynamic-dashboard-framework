import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '@env/environment';
import {ConfigurationService} from '@app/services/configuration.service';
import {MenuEventService} from '@app/shell/menu/menu-service';
import {AuthenticationService, I18nService} from '@app/core';
import {Router} from '@angular/router';

declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'app-menu-component',
    templateUrl: './view.html',
    styleUrls: ['./styles.css'],

})
export class MenuComponent implements OnInit {
    host = window.location.host;
    dashboardList: any[] = [];
    selectedBoard = '';
    placeHolderText = 'Ask the board to do something!';
    searchList: Array<string> = [];
    env: any;

    @ViewChild('notificationSideBar_tag') notificationSideBarRef: ElementRef;
    @ViewChild('layoutSideBar_tag') layoutSideBarRef: ElementRef;
    @ViewChild('aboutSideBar_tag') aboutSideBarRef: ElementRef;
    @ViewChild('stickymenu_tag') stickyMenuRef: ElementRef;

    notificationSideBar: any;
    layoutSideBar: any;
    aboutSideBar: any;
    stickyMenu: any;
    typeAheadIsInMenu = true;
    layoutId = 0;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private i18nService: I18nService,
                private _configurationService: ConfigurationService,
                private _menuEventService: MenuEventService) {
        this._menuEventService.unSubscribeAll();
        this.setupEventListeners();
        this.env = environment;
    }

    setupEventListeners() {
        const gridEventSubscription = this._menuEventService.listenForGridEvents().subscribe((event: IEvent) => {
            const edata = event['data'];
            switch (event['name']) {
                case 'boardUpdateEvent':
                    this.updateDashboardMenu(edata);
                    break;
            }
        });

        this._menuEventService.addSubscriber(gridEventSubscription);
    }

    ngOnInit() {
        this.updateDashboardMenu('');
        this.stickyMenu = jQuery(this.stickyMenuRef.nativeElement);
        this.stickyMenu.sticky();
    }

    emitBoardChangeLayoutEvent(event: any) {
        this._menuEventService.raiseMenuEvent({name: 'boardChangeLayoutEvent', data: event});
    }

    emitBoardSelectEvent(event: any) {
        this.boardSelect(event);
        this._menuEventService.raiseMenuEvent({name: 'boardSelectEvent', data: event});
    }

    emitBoardCreateEvent(event: any) {
        this._menuEventService.raiseMenuEvent({name: 'boardCreateEvent', data: event});
        this.updateDashboardMenu(event);
    }

    emitBoardEditEvent(event: any) {
        this._menuEventService.raiseMenuEvent({name: 'boardEditEvent', data: event});
    }

    emitBoardDeleteEvent(event: any) {
        this._menuEventService.raiseMenuEvent({name: 'boardDeleteEvent', data: event});
        this.updateDashboardMenu('');
    }

    emitBoardAddGadgetEvent(event: any) {
        this._menuEventService.raiseMenuEvent({name: 'boardAddGadgetEvent', data: event});
    }

    emitBoardAIAddGadgetEvent(event: any) {
        this._menuEventService.raiseMenuEvent({name: 'boardAIAddGadgetEvent', data: event});
    }

    updateDashboardMenu(selectedBoard: string) {
        this._configurationService.getBoards().subscribe(data => {
            const me = this;
            if (data && data instanceof Array && data.length) {
                this.dashboardList.length = 0;
                // sort boards
                data.sort((a: any, b: any) => a.boardInstanceId - b.boardInstanceId);
                data.forEach(board => {
                    me.dashboardList.push(board.title);
                });

                if (selectedBoard === '') {
                    this.boardSelect(this.dashboardList[0]);

                } else {
                    this.boardSelect(selectedBoard);
                }
            }
        });
    }

    boardSelect(selectedBoard: string) {
        this.selectedBoard = selectedBoard;
    }

    toggleLayoutSideBar() {
        this.layoutSideBar = jQuery(this.layoutSideBarRef.nativeElement);
        this.layoutSideBar.sidebar('setting', 'transition', 'overlay');
        this.layoutSideBar.sidebar('toggle');
        this.layoutId = this._configurationService.currentModel.id;
    }

    toggleNotificationSideBar() {
        this.notificationSideBar = jQuery(this.notificationSideBarRef.nativeElement);
        this.notificationSideBar.sidebar('setting', 'transition', 'overlay');
        this.notificationSideBar.sidebar('toggle');
    }

    toggleAboutSideBar() {
        this.aboutSideBar = jQuery(this.aboutSideBarRef.nativeElement);
        this.aboutSideBar.sidebar('setting', 'transition', 'overlay');
        this.aboutSideBar.sidebar('toggle');
    }

    public showDocumentation() {

        window.location.href = 'http://' + window.location.host + '/assets/documentation/index.html';
    }

    setLanguage(language: string) {
        this.i18nService.language = language;
    }

    logout() {
        this.authenticationService.logout()
            .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    }

    get currentLanguage(): string {
        return this.i18nService.language;
    }

    get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }

    get username(): string | null {
        const credentials = this.authenticationService.credentials;
        return credentials ? credentials.username : null;
    }
}
