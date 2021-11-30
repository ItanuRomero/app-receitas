import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';

import './styles.css';

export const Header = () => {
  return(
    <header className="header-container">
      <h1>app-receitas</h1>
      
      <AmplifySignOut />
    </header>
  )
}