import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IngredientComponentComponent } from "./ingredient-component/ingredient-component.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from "./components/footer/footer.component";
import { NgModalComponent } from 'src/app/modal/modal.component';
import { ImageClassificationComponent } from './image-classification/image-classification.component';


@NgModule({
  declarations: [
    AppComponent,
    IngredientComponentComponent,
    FooterComponent,
    NgModalComponent,
    ImageClassificationComponent
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    
   
  ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
