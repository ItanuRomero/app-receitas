import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { I18n } from 'aws-amplify';
import AmplifyI18n from 'amplify-i18n';

import App from './App';
import config from './aws-exports';

const locales = ["en", "fr", "pt-BR"];

Amplify.configure(config);
AmplifyI18n.configure(locales);

I18n.setLanguage("pt-BR");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);