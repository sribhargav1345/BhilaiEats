import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import MilkShakes from './MilkShakes';
import Pizza from './Pizza';
import Burger from './Burger';

function ShopPage() {
  const { _id } = useParams(); // Get the ID parameter from the URL

  // Based on the ID parameter, render the corresponding component
  const DynamicShopComponent = () => {
    switch (_id) {
      case 'milkshakes':
        return <MilkShakes />;
      case 'pizza':
        return <Pizza />;
      case 'burger':
        return <Burger />;
      default:
        return <div>Page not found</div>;
    }
  };

  return DynamicShopComponent();
}


