import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <main>
            <Link to="/recipes">
                <h1>Ver receitas</h1>
            </Link>
            <Link to="/new">
                <h1>Criar receitas</h1>
            </Link>
        </main>
    )
}

export default Home;