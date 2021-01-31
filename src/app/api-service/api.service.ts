import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Recipe } from "../ingredient-component/recipe";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { BulkRecipeInfo } from "src/app/ingredient-component/BulkRecipeInfo";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiURL: string = "https://api.spoonacular.com/recipes/";
  constructor(private httpClient: HttpClient) {}

  public getRecipes(ingredients: any[]): Observable<any> {
    let params = new HttpParams()
      .set("apiKey", "76b41fbfa7824cd790a2c736090a1b3f")
      .set("ranking", "2")
      .set("ignorePantry", "true")
      .set("number", "100");

    ingredients.forEach(element => {
      params = params.append("ingredients", element);
    });
    return this.httpClient
      .get<Recipe[] | any>(`${this.apiURL}/findByIngredients`, { params })
      .pipe(catchError(this.errorHandler));
  }

  public getBulkRecipeInformation(ids: string): Observable<BulkRecipeInfo[]> {
    let params = new HttpParams().set(
      "apiKey",
      "76b41fbfa7824cd790a2c736090a1b3f"
    );

    params = params.append("ids", ids);

    return this.httpClient
      .get<BulkRecipeInfo[]>(`${this.apiURL}/informationBulk`, { params })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
