import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
  let transfromedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if(transfromedIngredients.length === 0) {
    transfromedIngredients = <p>Start building your burger!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type='bread-top' />
      {transfromedIngredients}
      <BurgerIngredients type='bread-bottom' />
    </div>
  );
}

export default burger;
