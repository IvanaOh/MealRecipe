export class Recipe {
  id: string;
  title: string;
  image: string;
  missedIngredientCount: number;
  recipeInformation: string;
  public Recipe(id: string, title: string, missedIngredientCount: number) {
    this.id = id;
    this.title = title;
    this.missedIngredientCount = missedIngredientCount;
  }
  public getId() {
    return this.id;
  }
  public getTitle() {
    return this.title;
  }
  public getMissedIngredientCount() {
    return this.missedIngredientCount;
  }
}
