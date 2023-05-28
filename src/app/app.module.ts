import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, // Módulo do Angular Material com a referencia de todos os componentes(button, navbar, input e etc...)
    ReactiveFormsModule, //Modulo de formulários
    HttpClientModule, // Modulo para fazer requisições HTTP dentro do Angular (consumir apis)
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
