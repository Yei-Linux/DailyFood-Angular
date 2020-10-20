import { Food } from './food.model';
import { IngredientsFood } from './ingredients-food.model';

export class FoodIngredientsDetail {
    public foodRequest : Food;
    public ingredientsFoodList : IngredientsFood[];
    public day : string;
    public userId : any;
}
