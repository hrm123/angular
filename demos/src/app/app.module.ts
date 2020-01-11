import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {StoreModule, ActionReducer } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../environments/environment';
import * as fromApp  from './store/app-reducer';
import { AppState } from './store/app-reducer';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';

export function logger(reducer: ActionReducer<AppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer,  {metaReducers}),
    SharedModule,
    CoreModule

  ],
  /*
  providers: [ RecipeService, DataStorageService,RecipesResolverService,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
   ],
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
