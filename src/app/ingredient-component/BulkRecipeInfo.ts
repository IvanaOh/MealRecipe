export class BulkRecipeInfo {
  id: number;
  title: string;
  servings: number;
  readyInMinutes: number;
  spoonacularSourceUrl: string;
  glutenFree: boolean;
  vegetarian: boolean;
  instructions: string;

  public BulkRecipeInfo(
    id: number,
    title: string,
    servings: number,
    readyInMinutes: number,
    spoonacularSourceUrl: string,
    glutenFree: boolean,
    vegetarian: boolean
  ) {
    this.id = id;
    this.title = title;
    this.readyInMinutes = readyInMinutes;
    this.servings = servings;
    this.spoonacularSourceUrl = spoonacularSourceUrl;
    this.glutenFree = glutenFree;
    this.vegetarian = vegetarian;
  }

  public getId() {
    return this.id;
  }

  public getTitle() {
    return this.title;
  }
}
