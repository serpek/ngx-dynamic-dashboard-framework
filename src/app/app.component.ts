import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {I18nService, Logger} from '@app/core';
import {environment} from '@env/environment';
import {merge} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';

const log = new Logger('AppComponent');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private titleService: Title,
                private translateService: TranslateService,
                private i18nService: I18nService) {
        log.debug('constructor');
    }

    ngOnInit() {
        // Setup logger
        if (environment.production) {
            Logger.enableProductionMode();
        }

        log.debug('init');

        // Setup translations
        this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

        const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

        // Change page title on navigation or language change, based on route data
        merge(this.translateService.onLangChange, onNavigationEnd)
            .pipe(
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data)
            )
            .subscribe(event => {
                const title = event['title'];
                if (title) {
                    this.titleService.setTitle(this.translateService.instant(title));
                }
            });
    }
}
