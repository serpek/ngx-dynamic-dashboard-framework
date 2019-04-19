import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {RoutingModule} from './routing.module';
import {CoreModule} from '@app/core';
import {ShellModule} from '@app/shell/shell.module';
import {TranslateModule} from '@ngx-translate/core';
import {LoginModule} from '@app/login/login.module';
import {BoardModule} from '@app/board/board.module';
import {SharedModule} from '@app/shared';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        CoreModule,
        SharedModule,
        ShellModule,
        LoginModule,
        BoardModule,
        HttpClientJsonpModule,
        RoutingModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
