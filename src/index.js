import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { I18n } from 'aws-amplify';
import AmplifyI18n from 'amplify-i18n';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NewRecipe from './routes/newRecipe';
import ListRecipes from './routes/listRecipes';

Amplify.configure(config);
const locales = ["en", "fr", "pt-BR"];
AmplifyI18n.configure(locales);
I18n.setLanguage("pt-BR");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="new" element={<NewRecipe />} />
      <Route path="recipes" element={<ListRecipes />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
