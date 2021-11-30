import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";

function Header() {
    return(
        <header className="App-header">
            <h1>app-receitas</h1>
            <AmplifySignOut />
        </header>
    )
}

export default Header;