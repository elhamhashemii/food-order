// import { Fragment } from "react";
import { useContext } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import AuthContext from "../../store/cart-context";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
    amount: 1,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
    amount: 1,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
    amount: 1,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
    amount: 1,
  },
];

const AvailableMeals = () => {
  const ctx = useContext(AuthContext);

  // const addToCartHandler = () => ctx.addItem(meal);

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      meal={meal}
      onAddToCart={ctx.addItem.bind(meal)}
    />
  ));

  return (
    <section>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
