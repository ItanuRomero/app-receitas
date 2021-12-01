import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Home } from '../pages/Home';
import { Recipes } from '../pages/Recipes';
import { CreateRecipe } from '../pages/CreateRecipe'; 

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/recipes" element={<Recipes/>} />
      <Route path="/create-recipe" element={<CreateRecipe/>} />
    </Routes>
  );
}